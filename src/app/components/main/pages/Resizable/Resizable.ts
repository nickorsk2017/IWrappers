import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './Resizable.html',
  styleUrls: ['./Resizable.scss']
})
export class Resizable {
  apiRows = [
    {
      inputName: 'directions',
      description: `Where type of Direction: <span class="green">'top'</span> | <span class="green">'bottom'</span> | <span class="green">'left'</span>
       | <span class="green">'right'</span> | <span class="green">'top-left'</span> | <span class="green">'top - right'</span> | <span class="green">'bottom - left'</span> | <span class="green">'bottom - right'</span> | <span class="green">'all'</span><br><br>
       The Direction settings sets what side you want to change size.`,
      inputType: 'Direction[]'
    },
    {
      inputName: 'size',
      description: `Where type of Size: <pre>
      { initWidth: <span class="green">number</span> | <span class="green">string</span>;
        initHeight: <span class="green">number</span> | <span class="green">string</span>;
        minHeight?: <span class="green">number</span>;
        minWidth?: <span class="green">number</span>;
        maxHeight?: <span class="green">number</span>;
        maxWidth?: <span class="green">number</span>;
      }</pre> `,
      inputType: 'Size'
    },
    {
      inputName: 'visibleResizePoints',
      description: `Sets visibility of points for resize.`,
      inputType: 'boolean'
    },
    {
      inputName: 'float',
      description: `Sets float CSS property, default set up is null(disabled).`,
      inputType: `'right' <span class="black">|</span> 'left' <span class="black">|</span> null`
    },
    {
      inputName: 'onInitSize',
      description: `Where type of SizeWrapper: <pre>
      {
        width: <span class="green">number</span>;
        height: <span class="green">number</span>;
      }</pre><br><br>
      Sets callback function. Runs after initialize of size of wrapper. Return SizeWrapper ar attributes.
      `,
      inputType: `(size: SizeWrapper) => void`
    },
  ];
  constructor(private hostElement: ElementRef, private router: Router) {}

}
