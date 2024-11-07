import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortingComponent } from './sorting.component';
import { Title } from '@angular/platform-browser';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortingComponent],
      providers: [Title],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new array when newArray button is clicked', () => {
    const initialArrayLength = component.array.length;
    const newArrayButton = fixture.nativeElement.querySelector('.newArray');

    newArrayButton.click();

    expect(component.array.length).not.toEqual(initialArrayLength);
  });

  it('should disable sorting buttons when sorting starts', async () => {
    const bubbleSortButton = fixture.nativeElement.querySelector('.bubbleSort');
    bubbleSortButton.click();

    expect(bubbleSortButton.disabled).toBeTrue();
  });

  it('should enable sorting buttons after sorting finishes', async () => {
    const bubbleSortButton = fixture.nativeElement.querySelector('.bubbleSort');

    // Simulate clicking the bubble sort button
    bubbleSortButton.click();

    // Wait for sorting to finish
    await component.bubbleSort(); // Make sure to await the sorting function

    expect(bubbleSortButton.disabled).toBeFalse();
  });

  it('should properly sort the array using bubble sort', async () => {
    component.array = [5, 3, 8, 4, 2];

    await component.bubbleSort();

    expect(component.array).toEqual([2, 3, 4, 5, 8]);
  });

  it('should properly sort the array using insertion sort', async () => {
    component.array = [5, 3, 8, 4, 2];

    await component.insertionSort();

    expect(component.array).toEqual([2, 3, 4, 5, 8]);
  });

  it('should properly sort the array using selection sort', async () => {
    component.array = [5, 3, 8, 4, 2];

    await component.selectionSort();

    expect(component.array).toEqual([2, 3, 4, 5, 8]);
  });

  it('should properly sort the array using merge sort', async () => {
    component.array = [5, 3, 8, 4, 2];

    await component.mergeSort(Array.from(document.querySelectorAll('.bar')),0 ,component.array.length -1);

    expect(component.array).toEqual([2, 3, 4, 5, 8]);
   });

   it('should properly sort the array using quick sort', async () => {
     component.array = [5, 3, 8, 4, 2];

     await component.quickSort(Array.from(document.querySelectorAll('.bar')),0 ,component.array.length -1);

     expect(component.array).toEqual([2, 3, 4, 5, 8]);
   });

   it('should properly sort the array using heap sort', async () => {
     component.array = [5, 3, 8, 4, 2];

     await component.heapSort();

     expect(component.array).toEqual([2,3 ,4 ,5 ,8]);
   });
});
