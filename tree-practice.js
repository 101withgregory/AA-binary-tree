const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  // Your code here
  if (rootNode === null) {
    return null; // Return null for an empty tree
  }

  if (rootNode.left === null) {
    return rootNode.val; // Found the leftmost node
  }

  return findMinBST(rootNode.left);
}

function findMaxBST (rootNode) {
  // Your code here
  if(rootNode === null) return;

  if(rootNode.right === null){
    return rootNode.val;
  }

  return findMaxBST(rootNode.right)
}

function findMinBT (rootNode) {
  // Your code here
  if (rootNode === null) {
    return null; // No minimum value in an empty tree
  }

  let leftMin = findMinBT(rootNode.left);
  let rightMin = findMinBT(rootNode.right);

  let currentVal = rootNode.val;
  if (leftMin !== null && leftMin < currentVal) {
    currentVal = leftMin;
  }
  if (rightMin !== null && rightMin < currentVal) {
    currentVal = rightMin;
  }

  return currentVal;
  
}

function findMaxBT (rootNode) {
  // Your code here
  //check if tree is empty
  if(rootNode == null) return;

  let leftMax = findMaxBT(rootNode.left);
  let rightMax = findMaxBT(rootNode.right);

  let maxVal = rootNode.val;

  if(leftMax !== null && leftMax > maxVal){
    maxVal = leftMax.val;
  }
  if(rightMax !== null && rightMax > maxVal){
    maxVal = rightMax.val;
  }

  return maxVal;
}

function getHeight(rootNode) {
  // Base case: If the node is null, return -1 (height of an empty tree)
  if (rootNode === null) {
    return -1;
  }

  // Recursively calculate the heights of the left and right subtrees
  let leftHeight = getHeight(rootNode.left);
  let rightHeight = getHeight(rootNode.right);

  // Return the maximum of the left and right subtree heights, plus 1 for the current level
  return Math.max(leftHeight, rightHeight) + 1;
}


function balancedTree (rootNode) {
  // Your code here
    // Base case: If the node is null, return true
  if (rootNode === null) {
    return true;
  }

  // Recursively calculate the heights of the left and right subtrees
  let leftHeight = getHeight(rootNode.left);
  let rightHeight = getHeight(rootNode.right);

  // Check if the difference in heights between left and right subtrees is at most 1
  if (Math.abs(leftHeight - rightHeight) <= 1) {
    // Recursively check both left and right subtrees
    return balancedTree(rootNode.left) && balancedTree(rootNode.right);
  }

  // If the tree is not balanced, return false
  return false;
}

function countNodes (rootNode) {
  // Your code here
  //base case
  if(rootNode == null) return ;

  let stack = [rootNode];
  let count = 0;

  while(stack.length > 0){
    let currentNode = stack.pop();
    count++;

    if(currentNode.left){
      stack.push(currentNode.left);
    }
    if(currentNode.right){
      stack.push(currentNode.right);
    }

  }

  return count;
}

function getParentNode(rootNode, target) {
  if (rootNode === null) {
    return undefined;
  }

  let queue = [rootNode];
  
  while (queue.length > 0) {
    let currentNode = queue.shift();
    
    if (currentNode.left !== null && (currentNode.left.val === target)) {
      return currentNode;
    }
    
    if (currentNode.right !== null && (currentNode.right.val === target)) {
      return currentNode;
    }
    
    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }
    
    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }
  }

  return null;
}


function inOrderPredecessor (rootNode, target) {
  // Your code here
  if (rootNode === null) return undefined;

  let stack = [];
  let currentNode = rootNode;
  let prevNode = null;

  while (currentNode || stack.length > 0) {
    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }

    currentNode = stack.pop();

    // Check if the current node is the target node
    if (currentNode.val === target) {
      // If there's a previously visited node, return it as in-order predecessor
      return prevNode;
    }

    prevNode = currentNode;
    currentNode = currentNode.right;
  }

  // If the target value is not found in the tree
  return null;
}

function deleteNodeBST(rootNode, target) {
  // Base case: If the tree is empty, return null
  if (rootNode === null) return null;

  let queue = [rootNode];
  let parentNode = null; // Initialize parent as null
  let targetNode = null; // Initialize targetNode as null

  // Traverse the tree to find the target node and its parent
  while (queue.length > 0 && !targetNode) {
    parentNode = queue.shift(); // Take the front node from the queue

    // Check if the left child is the target
    if (parentNode.left && parentNode.left.val === target) {
      targetNode = parentNode.left;
    }
    // Check if the right child is the target
    else if (parentNode.right && parentNode.right.val === target) {
      targetNode = parentNode.right;
    }

    // Push the children of the current node into the queue
    if (parentNode.left) queue.push(parentNode.left);
    if (parentNode.right) queue.push(parentNode.right);
  }

  // If the target node was not found
  if (!targetNode) return undefined;

  // Case 0: No children and no parent
  if (!parentNode) {
    return null; // The tree was just a single node
  }

  // Case 1: No children
  if (!targetNode.left && !targetNode.right) {
    if (parentNode.left === targetNode) {
      parentNode.left = null;
    } else {
      parentNode.right = null;
    }
  }

  // Case 2: Two children
  else if (targetNode.left && targetNode.right) {
    // Find the in-order predecessor
    let inOrderPred = targetNode.left;
    while (inOrderPred.right) {
      inOrderPred = inOrderPred.right;
    }

    // Replace the target's value with the in-order predecessor's value
    targetNode.val = inOrderPred.val;

    // Delete the in-order predecessor
    deleteNodeBST(targetNode.left, inOrderPred.val);
  }

  // Case 3: One child
  else {
    let childNode = targetNode.left || targetNode.right;
    if (parentNode.left === targetNode) {
      parentNode.left = childNode;
    } else {
      parentNode.right = childNode;
    }
  }

  return rootNode; // Return the modified root node
}


module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}