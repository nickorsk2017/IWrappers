<style>
.menu-item {
  color: #1e4d79;
}
.instalation {
  border: 1px solid rgb(100, 98, 98);
  background: #333;
  display: inline-block;
  color: rgb(194, 194, 194);
  padding: 20px;
  user-select: all;
}
</style>
<h1>Getting started</h1>
IWrappers is the library for creating a modern UI, similar to a desktop OS. You can create stretchable, draggable, dropped elements of interface.
For example, it can be windows, chats, panels, and other.<br>
All components have flexible settings that can be customized.<br><br>
<b>The following components are available:</b><br><br>

<a class="menu-item" [routerLink]="[{outlets:{doc:['dnd']}}]">The DnDWrapper</a> is the component for drag and drop logic, as well as drag files.<br><br>

<a class="menu-item" [routerLink]="[{outlets:{doc:['movable']}}]">The MovableWrapper</a> is component for moving around the screen or a specified area. It can be useful for creating a modal window or chat.<br><br>

<a class="menu-item" [routerLink]="[{outlets:{doc:['resizable']}}]">The ResizableWrapper</a> is component for resizing a block, it can be useful for creating panels.<br><br>

<b>Installation:</b>
<br>

<p class="">
  npm i angular-i-wrappers
</p>


See documentation in:
<a href="https://nickorsk2017.github.io/IWrappers/">https://nickorsk2017.github.io/IWrappers/</a>
