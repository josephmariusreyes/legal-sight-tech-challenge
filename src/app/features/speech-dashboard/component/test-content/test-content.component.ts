import { Component } from '@angular/core';

@Component({
  selector: 'app-test-content',
  templateUrl: './test-content.component.html',
  styleUrls: ['./test-content.component.scss'],
  standalone: false
})
export class TestContentComponent {
  testData = [
    { id: 1, title: 'Test Item 1', description: 'This is a test item loaded via router outlet' },
    { id: 2, title: 'Test Item 2', description: 'Another test item showing dynamic content' },
    { id: 3, title: 'Test Item 3', description: 'Third test item demonstrating the functionality' }
  ];

  onTestAction(item: any) {
    console.log('Test action triggered for:', item);
  }
}
