// import { Component, AfterViewInit, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';

// @Component({
//   selector: 'app-sorting',
//   templateUrl: './sorting.component.html',
//   styleUrls: ['./sorting.component.css']
// })
// export class SortingComponent implements OnInit, AfterViewInit {
//   array: number[] = [];
//   delay: number = 100;

//   constructor(private titleService: Title) {}

//   ngOnInit(): void {
//     this.titleService.setTitle('Sorting Visualizer');
//     this.createNewArray(40); // Default size
//   }

//   ngAfterViewInit(): void {
//     this.setupEventListeners();
//   }

//   setupEventListeners(): void {
//     const newArrayBtn = document.querySelector('.newArray') as HTMLElement;
//     const sizeInput = document.querySelector('#arr_sz') as HTMLInputElement;
//     const speedInput = document.querySelector('#speed_input') as HTMLInputElement;

//     newArrayBtn.addEventListener('click', () => {
//       this.createNewArray(parseInt(sizeInput.value));
//     });

//     sizeInput.addEventListener('input', () => {
//       this.createNewArray(parseInt(sizeInput.value));
//     });

//     speedInput.addEventListener('input', () => {
//       this.delay = 320 - parseInt(speedInput.value);
//     });

//     this.setupSortButtons();
//   }

//   async createNewArray(size: number): Promise<void> {
//     this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 250) + 1);
//     this.renderBars();
//   }

//   renderBars(): void {
//     const barsContainer = document.getElementById('bars')!;
//     barsContainer.innerHTML = '';

//     this.array.forEach((value, index) => {
//       const bar = document.createElement('div');
//       bar.style.height = `${1.5 * value}px`;
//       bar.className = 'bar flex-item barNo' + index;
//       barsContainer.appendChild(bar);
//     });
//   }

//   async bubbleSort(): Promise<void> {
//     const bars = Array.from(document.querySelectorAll('.bar')) as HTMLElement[];

//     for (let i = 0; i < bars.length - 1; i++) {
//       for (let j = 0; j < bars.length - i - 1; j++) {
//         bars[j].style.backgroundColor = 'blue';
//         bars[j + 1].style.backgroundColor = 'blue';

//         if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
//           await this.swap(bars[j], bars[j + 1]);
//         }

//         bars[j].style.backgroundColor = 'cyan';
//         bars[j + 1].style.backgroundColor = 'cyan';
//       }
//       bars[bars.length - 1 - i].style.backgroundColor = 'green';
//     }
//     bars[0].style.backgroundColor = 'green';
//   }

//   async insertionSort(): Promise<void> {
//     const bars = Array.from(document.querySelectorAll('.bar')) as HTMLElement[];

//     for (let i = 1; i < bars.length; i++) {
//       let keyHeight = parseInt(bars[i].style.height);
//       let j = i - 1;

//       while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
//         await this.swap(bars[j], bars[j + 1]);
//         j--;
//       }
//       bars[j + 1].style.height = `${keyHeight}px`;
//       await this.wait(this.delay);
//       bars[i].style.backgroundColor = 'green';
//     }

//     for (let k = 0; k < bars.length; k++) {
//       bars[k].style.backgroundColor = 'green';
//     }
//   }

//    async mergeSort(array: HTMLElement[], left: number, right: number): Promise<void> {
//      if (left >= right) return;

//      const mid = Math.floor((left + right) / 2);

//      await this.mergeSort(array, left, mid);
//      await this.mergeSort(array, mid + 1, right);

//      await this.merge(array, left, mid, right);
//    }

//    async merge(array: HTMLElement[], left: number, mid: number, right: number): Promise<void> {
//      const n1 = mid - left + 1;
//      const n2 = right - mid;

//      const leftArray: HTMLElement[] = [];
//      const rightArray: HTMLElement[] = [];

//      for (let r = 0; r < n1; r++) leftArray.push(array[left + r]);
//      for (let t = 0; t < n2; t++) rightArray.push(array[mid + t + 1]);

//      let i = 0, j = 0, k = left;

//      while (i < n1 && j < n2) {
//        if (parseInt(leftArray[i].style.height) <= parseInt(rightArray[j].style.height)) {
//          array[k++]!.style.height = leftArray[i++].style.height;
//          array[k - 1]!.style.backgroundColor = 'lightgreen';
//        } else {
//          array[k++]!.style.height = rightArray[j++].style.height;
//          array[k - 1]!.style.backgroundColor = 'lightgreen';
//        }
//        await this.wait(this.delay);
//      }

//      while (i < n1) {
//        array[k++]!.style.height = leftArray[i++].style.height;
//        await this.wait(this.delay);
//      }

//      while (j < n2) {
//        array[k++]!.style.height = rightArray[j++].style.height;
//        await this.wait(this.delay);
//      }

//      for (let x = left; x <= right; x++) {
//        array[x]!.style.backgroundColor = 'green';
//      }
//    }

//    async quickSort(array: HTMLElement[], low: number, high: number): Promise<void> {
//      if (low < high) {
//        const piIndex = await this.partition(array, low, high);

//        await this.quickSort(array, low, piIndex - 1);
//        await this.quickSort(array, piIndex + 1, high);

//        for (let i=low; i<=high; i++) {
//          array[i]!.style.backgroundColor='green';
//        }

//        await this.wait(this.delay);
//      }
//    }

//    async partition(array: HTMLElement[], low: number, high: number): Promise<number> {
//      const pivotHeight = parseInt(array[high].style.height);
//      let i = low - 1;

//      for (let j=low; j<high; j++) {
//        if (parseInt(array[j].style.height) < pivotHeight) {
//          i++;
//          await this.swap(array[i], array[j]);
//        }
//      }
//      await this.swap(array[i + 1], array[high]);
//      return i + 1;
//    }

//    async selectionSort(): Promise<void> {
//      const bars = Array.from(document.querySelectorAll('.bar')) as HTMLElement[];

//      for (let i=0; i<bars.length-1; i++) {
//        let minIndex=i;
//        bars[i].style.backgroundColor='blue';

//        for(let j=i+1;j<bars.length;j++) {
//          bars[j].style.backgroundColor='red';

//          if(parseInt(bars[j].style.height)<parseInt(bars[minIndex].style.height)) {
//            if(minIndex!==i)
//              bars[minIndex].style.backgroundColor='cyan';
//            minIndex=j;
//          }
//          await this.wait(this.delay);
//        }
//        await this.swap(bars[i],bars[minIndex]);
//        bars[minIndex].style.backgroundColor='cyan';
//        bars[i].style.backgroundColor='green';
//      }
//      bars[bars.length-1].style.backgroundColor='green';
//    }

//    async heapSort(): Promise<void> {
//      const bars= Array.from(document.querySelectorAll('.bar')) as HTMLElement[];
//      const n=bars.length;

//      for(let i=Math.floor(n/2)-1;i>=0;i--)
//        await this.heapify(bars,n,i);

//      for(let i=n-1;i>=0;i--) {
//        await this.swap(bars[0],bars[i]);
//        bars[i].style.backgroundColor='green';
//        await this.heapify(bars,i,0);
//      }
//    }

//    async heapify(bars: HTMLElement[], n:number,i:number):Promise<void> {
//      let largest=i;
//      const left=2*i+1;
//      const right=2*i+2;

//      if(left<n && parseInt(bars[left].style.height)>parseInt(bars[largest].style.height))
//        largest=left;

//      if(right<n && parseInt(bars[right].style.height)>parseInt(bars[largest].style.height))
//        largest=right;

//      if(largest!==i) {
//        await this.swap(bars[i],bars[largest]);
//        await this.heapify(bars,n,largest);
//      }
//    }

//    async swap(barA: HTMLElement, barB: HTMLElement): Promise<void> {
//      let tempHeight=barA.style.height;
//      barA.style.height=barB.style.height;
//      barB.style.height=tempHeight;

//      await this.wait(this.delay);
//    }

//    wait(ms: number): Promise<void> {
//      return new Promise(resolve => setTimeout(resolve, ms));
//    }

//    setupSortButtons(): void {
//      const bubbleSortBtn=document.querySelector('.bubbleSort') as HTMLElement;
//      bubbleSortBtn.addEventListener('click',async()=>{await this.bubbleSort();});

//      const insertionSortBtn=document.querySelector('.insertionSort') as HTMLElement;
//      insertionSortBtn.addEventListener('click',async()=>{await this.insertionSort();});

//      const mergeSortBtn=document.querySelector('.mergeSort') as HTMLElement;
//      mergeSortBtn.addEventListener('click',async()=>{await this.mergeSort(Array.from(document.querySelectorAll('.bar')) as HTMLElement[],0,this.array.length-1);});

//      const quickSortBtn=document.querySelector('.quickSort') as HTMLElement;
//      quickSortBtn.addEventListener('click',async()=>{await this.quickSort(Array.from(document.querySelectorAll('.bar')) as HTMLElement[],0,this.array.length-1);});

//      const selectionSortBtn=document.querySelector('.selectionSort') as HTMLElement;
//      selectionSortBtn.addEventListener('click',async()=>{await this.selectionSort();});

//      const heapSortBtn=document.querySelector('.heapSort') as HTMLElement;
//      heapSortBtn.addEventListener('click',async()=>{await this.heapSort();});

//       // Topological Sort button
//       const topologicalSortBtn=document.querySelector('.topologicalSort') as HTMLElement;

//       topologicalSortBtn.addEventListener("click", async () => {
//         // Use 'this' to call instance methods
//         this.disableSortingBtn();
//         this.disableSizeSlider();
//         this.disableNewArrayBtn();

//         await this.topologicalSort(); // Perform the sort

//         // Use 'this' to call instance methods
//         this.enableSortingBtn();
//         this.enableSizeSlider();
//         this.enableNewArrayBtn();
//       });
//    }

//    async topologicalSort(): Promise<void> {
//       const ele = document.querySelectorAll(".bar") as NodeListOf<HTMLElement>;
//       const visited = new Set<number>();
//       const stack: number[] = [];

//       // Helper function for DFS
//       // Use arrow function to maintain context of "this"
//       const dfs = async (nodeIndex: number): Promise<void> => {
//           visited.add(nodeIndex);
//           ele[nodeIndex].style.backgroundColor = "blue"; // Mark node as visited

//           // Use 'this' to refer to the component's delay
//           await new Promise(resolve => setTimeout(resolve, this.delay)); // Wait for animation

//           // Loop through neighbors (in a linear graph)
//           for (let neighbor = nodeIndex + 1; neighbor < ele.length; neighbor++) {
//               if (!visited.has(neighbor)) {
//                   await dfs(neighbor); // Recursively visit neighbors
//               }
//           }

//           stack.push(nodeIndex); // Push node to stack after visiting all neighbors
//           ele[nodeIndex].style.backgroundColor = "green"; // Mark node as finished
//       };

//       // Start DFS from each unvisited node
//       for (let i = 0; i < ele.length; i++) {
//           if (!visited.has(i)) {
//               await dfs(i);
//           }
//       }

//       // Reverse the stack to get the topological order
//       while (stack.length) {
//           const index = stack.pop()!;
//           ele[index].style.height = `${(index + 1) * 10}px`; // Adjust height for visualization
//           await new Promise(resolve => setTimeout(resolve, this.delay)); // Wait for animation
//       }
//    }

//    // Enable and disable functions
//    disableSortingBtn(): void {
//       document.querySelectorAll(".bubbleSort,.insertionSort,.mergeSort,.quickSort,.selectionSort").forEach(btn => btn.setAttribute("disabled", "true"));
//    }

//    enableSortingBtn(): void {
//       document.querySelectorAll(".bubbleSort,.insertionSort,.mergeSort,.quickSort,.selectionSort").forEach(btn => btn.removeAttribute("disabled"));
//    }

//    disableSizeSlider(): void {
//       document.getElementById("arr_sz")!.setAttribute("disabled", "true");
//    }

//    enableSizeSlider(): void {
//       document.getElementById("arr_sz")!.removeAttribute("disabled");
//    }

//    disableNewArrayBtn(): void {
//       document.querySelector(".newArray")!.setAttribute("disabled", "true");
//    }

//    enableNewArrayBtn(): void {
//       document.querySelector(".newArray")!.removeAttribute("disabled");
//    }
// }

import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit, AfterViewInit {
  array: number[] = [];
  delay: number = 100;

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Sorting Visualizer');
    this.createNewArray(40); // Default size
  }

  ngAfterViewInit(): void {
    this.setupEventListeners();
  }


  setupEventListeners(): void {
    const newArrayBtn = document.querySelector('.newArray') as HTMLElement;
    const sizeInput = document.querySelector('#arr_sz') as HTMLInputElement;
    const speedInput = document.querySelector('#speed_input') as HTMLInputElement;

    newArrayBtn.addEventListener('click', () => {
      this.createNewArray(parseInt(sizeInput.value));
    });

    sizeInput.addEventListener('input', () => {
      this.createNewArray(parseInt(sizeInput.value));
    });

    speedInput.addEventListener('input', () => {
      this.delay = 320 - parseInt(speedInput.value);
    });

    this.setupSortButtons();
  }

  createNewArray(size: number): void {
    this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 250) + 1);
    this.renderBars();
}


  renderBars(): void {
    const barsContainer = document.getElementById('bars')!;
    barsContainer.innerHTML = ''; // Clear existing bars

    this.array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.style.height = `${1.5 * value}px`; // Set height based on value
        bar.className = 'bar'; // Assign class for styling
        barsContainer.appendChild(bar); // Append bar to container
    });

    console.log('Bars rendered:', this.array);
}

  async bubbleSort(): Promise<void> {
    console.log("Starting Bubble Sort");
    const bars = Array.from(document.querySelectorAll('.bar')) as HTMLElement[];

    for (let i = 0; i < bars.length - 1; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        bars[j].style.backgroundColor = 'blue';
        bars[j + 1].style.backgroundColor = 'blue';

        await this.wait(this.delay);

        if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
          await this.swap(bars[j], bars[j + 1]);
        }

        bars[j].style.backgroundColor = 'cyan';
        bars[j + 1].style.backgroundColor = 'cyan';
      }
      bars[bars.length - 1 - i].style.backgroundColor = 'green';
    }
    bars[0].style.backgroundColor = 'green';
  }

  async insertionSort(): Promise<void> {
    console.log("Starting insertionSort Sort");
    const bars = Array.from(document.querySelectorAll('.bar')) as HTMLElement[];

    for (let i = 1; i < bars.length; i++) {
      let keyHeight = parseInt(bars[i].style.height);
      let j = i - 1;

      while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
        await this.swap(bars[j], bars[j + 1]);
        j--;
      }
      bars[j + 1].style.height = `${keyHeight}px`;
      await this.wait(this.delay);
      bars[i].style.backgroundColor = 'green';
    }

    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = 'green';
    }
  }

  async mergeSort(array: HTMLElement[], left: number, right: number): Promise<void> {
    console.log("Starting mergeSort Sort");

     if (left >= right) return;

     const mid = Math.floor((left + right) / 2);

     await this.mergeSort(array, left, mid);
     await this.mergeSort(array, mid + 1, right);

     await this.merge(array, left, mid, right);
   }

   async merge(array: HTMLElement[], left: number, mid: number, right: number): Promise<void> {
     const n1 = mid - left + 1;
     const n2 = right - mid;

     const leftArray: HTMLElement[] = [];
     const rightArray: HTMLElement[] = [];

     for (let r = 0; r < n1; r++) leftArray.push(array[left + r]);
     for (let t = 0; t < n2; t++) rightArray.push(array[mid + t + 1]);

     let i = 0, j = 0, k = left;

     while (i < n1 && j < n2) {
       if (parseInt(leftArray[i].style.height) <= parseInt(rightArray[j].style.height)) {
         array[k++]!.style.height = leftArray[i++].style.height;
         array[k - 1]!.style.backgroundColor = 'lightgreen';
       } else {
         array[k++]!.style.height = rightArray[j++].style.height;
         array[k - 1]!.style.backgroundColor = 'lightgreen';
       }
       await this.wait(this.delay);
     }

     while (i < n1) {
       array[k++]!.style.height = leftArray[i++].style.height;
       await this.wait(this.delay);
     }

     while (j < n2) {
       array[k++]!.style.height = rightArray[j++].style.height;
       await this.wait(this.delay);
     }

     for (let x = left; x <= right; x++) {
       array[x]!.style.backgroundColor = 'green';
     }
   }

  async quickSort(array: HTMLElement[], low: number, high: number): Promise<void> {
    console.log("Starting quickSort Sort");
     if (low < high) {
       const piIndex = await this.partition(array, low, high);

       await this.quickSort(array, low, piIndex - 1);
       await this.quickSort(array, piIndex + 1, high);

       for (let i=low; i<=high; i++) {
         array[i]!.style.backgroundColor='green';
       }

       await this.wait(this.delay);
     }
   }

   async partition(array: HTMLElement[], low: number, high: number): Promise<number> {
     const pivotHeight = parseInt(array[high].style.height);
     let i = low - 1;

     for (let j=low; j<high; j++) {
       if (parseInt(array[j].style.height) < pivotHeight) {
         i++;
         await this.swap(array[i], array[j]);
       }
     }
     await this.swap(array[i + 1], array[high]);
     return i + 1;
   }

  async selectionSort(): Promise<void> {
    console.log("Starting selectionSort Sort");
      const e = document.querySelectorAll(".bar") as NodeListOf<HTMLElement>;
      for (let t = 0; t < e.length; t++) {
          let n = t;
          e[t].style.backgroundColor = "blue"; // Mark current element
          for (let a = t + 1; a < e.length; a++) {
              e[a].style.backgroundColor = "red"; // Mark comparison element
              await this.wait(this.delay); // Wait for animation
              if (parseInt(e[a].style.height) < parseInt(e[n].style.height)) {
                  if (n !== t) e[n].style.backgroundColor = "cyan"; // Reset previous min
                  n = a; // Update min index
              } else {
                  e[a].style.backgroundColor= "cyan"; // Reset color if not min
              }
          }
          await this.wait(this.delay); // Wait before swap
          await this.swap(e[n], e[t]); // Swap elements
          e[n].style.backgroundColor= "cyan"; // Mark sorted element
          e[t].style.backgroundColor= "green"; // Mark current element as sorted
      }
   }

   async heapSort(): Promise<void> { /* Implement heap sort */ }

   async swap(barA: HTMLElement, barB: HTMLElement): Promise<void> {
     let tempHeight=barA.style.height;
     barA.style.height=barB.style.height;
     barB.style.height=tempHeight;
     console.log(`Swapped heights: ${barA.style.height} <-> ${barB.style.height}`);
     await this.wait(this.delay);
   }

   wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      console.log(`Waiting for ${ms} ms`);
      setTimeout(resolve, ms);
    });
  }

   setupSortButtons(): void {
     const bubbleSortBtn=document.querySelector('.bubbleSort') as HTMLElement;
     bubbleSortBtn.addEventListener('click',async()=>{await this.bubbleSort();});

     const insertionSortBtn=document.querySelector('.insertionSort') as HTMLElement;
     insertionSortBtn.addEventListener('click',async()=>{await this.insertionSort();});

     const mergeSortBtn=document.querySelector('.mergeSort') as HTMLElement;
     mergeSortBtn.addEventListener('click',async()=>{await this.mergeSort(Array.from(document.querySelectorAll('.bar')) as HTMLElement[],0,this.array.length-1);});

     const quickSortBtn=document.querySelector('.quickSort') as HTMLElement;
     quickSortBtn.addEventListener('click',async()=>{await this.quickSort(Array.from(document.querySelectorAll('.bar')) as HTMLElement[],0,this.array.length-1);});

     const selectionSortBtn=document.querySelector('.selectionSort') as HTMLElement;
     selectionSortBtn.addEventListener('click',async()=>{await this.selectionSort();});

     const heapSortBtn=document.querySelector('.heapSort') as HTMLElement;
     heapSortBtn.addEventListener('click',async()=>{await this.heapSort();});

      // Topological Sort button
      const topologicalSortBtn=document.querySelector('.topologicalSort') as HTMLElement;

      topologicalSortBtn.addEventListener("click", async () => {
        // Use 'this' to call instance methods
        this.disableSortingBtn();
        this.disableSizeSlider();
        this.disableNewArrayBtn();

        await this.topologicalSort(); // Perform the sort

        // Use 'this' to call instance methods
        this.enableSortingBtn();
        this.enableSizeSlider();
        this.enableNewArrayBtn();
      });
   }

   async topologicalSort(): Promise<void> { /* Implement topological sort */ }

   // Enable and disable functions
   disableSortingBtn(): void {
          document.querySelectorAll(".bubbleSort,.insertionSort,.mergeSort,.quickSort,.selectionSort").forEach(btn => btn.setAttribute("disabled", "true"));
       }

       enableSortingBtn(): void {
          document.querySelectorAll(".bubbleSort,.insertionSort,.mergeSort,.quickSort,.selectionSort").forEach(btn => btn.removeAttribute("disabled"));
       }

       disableSizeSlider(): void {
          document.getElementById("arr_sz")!.setAttribute("disabled", "true");
       }

       enableSizeSlider(): void {
          document.getElementById("arr_sz")!.removeAttribute("disabled");
       }

       disableNewArrayBtn(): void {
          document.querySelector(".newArray")!.setAttribute("disabled", "true");
       }

       enableNewArrayBtn(): void {
          document.querySelector(".newArray")!.removeAttribute("disabled");
       }
}
