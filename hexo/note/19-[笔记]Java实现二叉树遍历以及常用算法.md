---
title: 【笔记】Java实现二叉树遍历以及常用算法
date: 2016-01-02 15:02:12
tags:
categories:
- 笔记
---
> [笔记系列文章说明]: 该类型的文章是笔者学习过程中整理的学习笔记.

#### 分类
常用二叉树有:
完全二叉树,平衡二叉树,红黑树,满二叉树等

#### 二叉树有4种遍历方式

1. 前序遍历:
>首先访问根，再先序遍历左（右）子树，最后先序遍历右（左）子树
2. 中序遍历:
>首先中序遍历左（右）子树，再访问根，最后中序遍历右（左）子树
3. 后序遍历:
>首先后序遍历左（右）子树，再后序遍历右（左）子树，最后访问根
4. 层次遍历:
>即按照层次访问，访问根，访问子女，再访问子女的子女（越往后的层次越低）（两个子女的级别相同,通常先左后右）

#### CODE
##### 先抽象出树实体
```java
package test;

/**
 * 树的模型
 *
 * @author lxz
 *
 */
public class Tree {
    private Tree leftTree;// 左子树
    private Tree rightTree;// 右子树
    private Object data;// 节点数据

    public Tree() {
    }

    public Tree(Object data) {
        this.data = data;
    }

    /*
     * 求data所对应结点的层数，
     * 如果对象不在树中,结果返回-1;
     * 否则结果返回该对象在树中所处的层次,
     * 规定根节点为第一层
     */
    public int level(Object data) {
        int leftLevel, rightLevel;
        if (this == null)
            return -1;
        if (data == this.data)
            return 1;
        leftLevel = leftTree == null ? -1 : leftTree.level(data);
        rightLevel = rightTree == null ? -1 : rightTree.level(data);
        if (leftLevel < 0 && rightLevel < 0)
            return -1;
        return leftLevel > rightLevel ? leftLevel + 1 : rightLevel + 1;
    }

    /*
     *  将树中的每个节点的孩子对换位置
     */
    public void exChange() {
        if (this == null)
            return;
        if (leftTree != null)
            leftTree.exChange();
        if (rightTree != null)
            rightTree.exChange();
        Tree temp = leftTree;
        leftTree = rightTree;
        rightTree = temp;
    }


    public Tree getLeftTree() {
        return leftTree;
    }

    public void setLeftTree(Tree leftTree) {
        this.leftTree = leftTree;
    }

    public Tree getRightTree() {
        return rightTree;
    }

    public void setRightTree(Tree rightTree) {
        this.rightTree = rightTree;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
```

##### 再写遍历树的各种算法
```java
package test;

import java.util.Stack;

public class TreeUtil {

    /*
     * 先序遍历二叉树-递归
     *
     * @param tree
     */
    public static void preOrder(Tree tree) {
        if (tree != null) {
            System.out.print(tree.getData().toString());
            preOrder(tree.getLeftTree());
            preOrder(tree.getRightTree());
        }
    }

    /*
     * 先序遍历二叉树-后进先出堆栈
     *
     * @param tree
     */
    public static void stackPreOrder(Tree tree) {
        Stack<Tree> stack = new Stack<Tree>();
        if (tree != null) {
            stack.push(tree);// 放入本
            while (!stack.isEmpty()) {
                tree = stack.pop();
                System.out.print(tree.getData());
                if (tree.getRightTree() != null) {
                    stack.push(tree.getRightTree());// 放入右
                }
                if (tree.getLeftTree() != null) {
                    stack.push(tree.getLeftTree());// 放入左
                }
            }
        }
    }

    /*
     * 中序遍历二叉树-递归
     *
     * @param tree
     */
    public static void inOrder(Tree tree) {
        if (tree != null) {
            inOrder(tree.getLeftTree());
            System.out.print(tree.getData());
            inOrder(tree.getRightTree());
        }
    }

    /*
     * 中序遍历二叉树-后进先出堆栈
     *
     * @param tree
     */
    public static void stackInOrder(Tree tree) {
        Stack<Tree> stack = new Stack<Tree>();
        while (tree != null) {
            while (tree != null) {
                if (tree.getRightTree() != null) {
                    stack.push(tree.getRightTree());
                }
                stack.push(tree);
                tree = tree.getLeftTree();
            }
            tree = stack.pop();
            while (!stack.empty() && tree.getRightTree() == null) {
                System.out.print(tree.getData());
                tree = stack.pop();
            }
            System.out.print(tree.getData());
            if (!stack.empty()) {
                tree = stack.pop();
            } else {
                tree = null;
            }
        }
    }

    /*
     * 后序遍历二叉树-递归
     *
     * @param tree
     */
    public static void postOrder(Tree tree) {
        if (tree != null) {
            postOrder(tree.getLeftTree());
            postOrder(tree.getRightTree());
            System.out.print(tree.getData());
        }
    }

    /*
     * 中序遍历二叉树-后进先出堆栈
     *
     * @param tree
     */
    public static void stackPostOrder(Tree tree) {
        Tree tempTree = tree;
        Stack<Tree> stack = new Stack<Tree>();
        while (tree != null) {
            for (; tree.getLeftTree() != null; tree = tree.getLeftTree()) {
                stack.push(tree);
            }
            while (tree != null
                    && (tree.getRightTree() == null || tree.getRightTree() == tempTree)) {
                System.out.print(tree.getData());
                tempTree = tree;
                if (stack.empty()) {
                    return;
                }
                tree = stack.pop();
            }
            stack.push(tree);
            tree = tree.getRightTree();
        }
    }

    /*
     * 层次遍历二叉树
     *
     * @param tree
     */
    public static void layerOrder(Tree tree) {
        Tree[] array = new Tree[100];// 最多遍历100个
        array[0] = tree;
        int front = 0;
        int rear = 1;
        while (front < rear) {
            if (array[front] != null) {
                System.out.print(array[front].getData());
                if (array[front].getLeftTree() != null) {
                    array[rear++] = array[front].getLeftTree();
                }
                if (array[front].getRightTree() != null) {
                    array[rear++] = array[front].getRightTree();
                }
                front++;
            }
        }
    }

    /*
     * 计算树的高度
     *
     * @param tree
     *
     * @return
     */
    public static int height(Tree tree) {
        int leftTreeHeight = 0;
        int rightTreeHeight = 0;
        if (tree != null) {
            leftTreeHeight = height(tree.getLeftTree());
            rightTreeHeight = height(tree.getRightTree());
            return leftTreeHeight > rightTreeHeight ? leftTreeHeight
                    : rightTreeHeight;
        } else {
            return 0;
        }
    }

    /*
     * 求二叉树的结点总数
     *
     * @param tree
     *
     * @return
     */
    public static int nodes(Tree tree) {
        if (tree == null)
            return 0;
        else {
            int left = nodes(tree.getLeftTree());
            int right = nodes(tree.getRightTree());
            return left + right + 1;
        }
    }

    /*
     * 求二叉树叶子节点的总数
     */
    public static int leaf(Tree tree) {
        if (tree == null)
            return 0;
        else {
            int left = leaf(tree.getLeftTree());
            int right = leaf(tree.getRightTree());
            if (tree.getLeftTree() == null && tree.getRightTree() == null)
                return left + right + 1;
            else
                return left + right;

        }
    }

    /*
     * 求二叉树父节点个数
     *
     * @param tree
     *
     * @return
     */
    public static int fatherNodes(Tree tree) {
        if (tree == null
                || (tree.getLeftTree() == null && tree.getRightTree() == null))
            return 0;
        else {
            int left = fatherNodes(tree.getLeftTree());
            int right = fatherNodes(tree.getRightTree());
            return left + right + 1;
        }
    }

    /*
     * 求只有一个孩子结点的父节点个数
     */
    public static int oneChildFather(Tree tree) {
        int left, right;
        if (tree == null
                || (tree.getRightTree() == null && tree.getLeftTree() == null))
            return 0;
        else {
            left = oneChildFather(tree.getLeftTree());
            right = oneChildFather(tree.getRightTree());
            if ((tree.getLeftTree() != null && tree.getRightTree() == null)
                    || (tree.getLeftTree() == null && tree.getRightTree() != null))
                return left + right + 1;
            else
                return left + right;/* 加1是因为要算上根节点 */
        }
    }

    /*
     * 求二叉树只拥有左孩子的父节点总数
     */
    public static int leftChildFather(Tree tree) {
        if (tree == null)
            return 0;
        else {
            int left = leftChildFather(tree.getLeftTree());
            int right = leftChildFather(tree.getRightTree());
            if ((tree.getLeftTree() != null && tree.getRightTree() == null))
                return left + right + 1;
            else
                return left + right;
        }
    }

    /*
     * 求二叉树只拥有右孩子的结点总数
     */
    public static int rightChildFather(Tree tree) {
        if (tree == null || tree.getRightTree() == null)
            return 0;
        else {
            int left = rightChildFather(tree.getLeftTree());
            int right = rightChildFather(tree.getRightTree());
            if (tree.getLeftTree() == null && tree.getRightTree() != null)
                return left + right + 1;
            else
                return left + right;
        }
    }

    /*
     * 计算有两个节点的父节点的个数
     */
    public static int doubleChildFather(Tree tree) {
        int left, right;
        if (tree == null)
            return 0;
        else {
            left = doubleChildFather(tree.getLeftTree());
            right = doubleChildFather(tree.getRightTree());
            if (tree.getLeftTree() != null && tree.getRightTree() != null)
                return (left + right + 1);/* 加1是因为要算上根节点 */
            else
                return (left + right);
        }
    }

    /*
     *  递归求所有结点的和
     */
    public static int getSumByRecursion(Tree tree) {
        if (tree == null) {
            return 0;
        } else {
            int left = getSumByRecursion(tree.getLeftTree());
            int right = getSumByRecursion(tree.getRightTree());
            return Integer.parseInt(tree.getData().toString()) + left + right;
        }
    }

    /*
     *  非递归求二叉树中所有结点的和
     */
    public static int getSumByNoRecursion(Tree tree) {
        Stack<Tree> stack = new Stack<Tree>();
        int sum = 0;
        if (tree != null) {
            stack.push(tree);
            while (!stack.isEmpty()) {
                tree = stack.pop();
                sum += Integer.parseInt(tree.getData().toString());
                if (tree.getLeftTree() != null)
                    stack.push(tree.getLeftTree());
                if (tree.getRightTree() != null)
                    stack.push(tree.getRightTree());
            }
        }
        return sum;
    }

}
```

##### Test
```java
package test;

public class TreeTest {

    public static void main(String[] args) {
        //根节点是A
        Tree treeA = new Tree("A");
        Tree treeB = new Tree("B");
        Tree treeC = new Tree("C");
        Tree treeD = new Tree("D");
        Tree treeE = new Tree("E");
        Tree treeF = new Tree("F");
        Tree treeG = new Tree("G");
        Tree treeH = new Tree("H");
        Tree treeI = new Tree("I");
        treeA.setLeftTree(treeB);
        treeA.setRightTree(treeC);
        treeB.setLeftTree(treeD);
        treeB.setRightTree(treeE);
        treeE.setRightTree(treeF);
        treeF.setLeftTree(treeG);
        treeG.setLeftTree(treeH);
        treeH.setLeftTree(treeI);
        System.out.println("先序遍历二叉树-递归:");
        TreeUtil.preOrder(treeA);
        System.out.println("\n先序遍历二叉树-堆栈:");
        TreeUtil.stackPreOrder(treeA);
        System.out.println("\n中序遍历二叉树-递归:");
        TreeUtil.inOrder(treeA);
        System.out.println("\n中序遍历二叉树-堆栈:");
        TreeUtil.stackInOrder(treeA);
        System.out.println("\n后序遍历二叉树-递归:");
        TreeUtil.postOrder(treeA);
        System.out.println("\n层次遍历二叉树:");
        TreeUtil.layerOrder(treeA);
    }
}
```

>结果

![](/images/19-01.png)
先序遍历二叉树-递归:
ABDEFGHIC
先序遍历二叉树-堆栈:
ABDEFGHIC
中序遍历二叉树-递归:
DBEIHGFAC
中序遍历二叉树-堆栈:
DBEIHGFAC
后序遍历二叉树-递归:
DIHGFEBCA
层次遍历二叉树:
ABCDEFGHI