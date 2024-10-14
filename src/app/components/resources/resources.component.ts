import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Video {
  title: string;
  link: string;
  thumbnail: string;
  category: string;
}

interface Resource {
  title: string;
  link: string;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [FormsModule, NavbarComponent, CommonModule],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  searchTerm: string = '';
  categories: string[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  selectedCategory: string = 'All';
  videos: Video[] = [
    { title: 'Striver', link: 'https://www.youtube.com/watch?v=M3_pLsDdeuU&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn', thumbnail: 'https://img.youtube.com/vi/M3_pLsDdeuU/0.jpg', category: 'Beginner' },
    { title: 'Apna College', link: 'https://www.youtube.com/watch?v=59fUtYYz7ZU&t=84s&pp=ygUJZ3JhcGggZHNh', thumbnail: 'https://img.youtube.com/vi/59fUtYYz7ZU/0.jpg', category: 'Intermediate' },
    { title: 'Code with Harry', link: 'https://www.youtube.com/watch?v=TwdjOQMTaQ4&list=PLUPfVLTCq5c2SmJeiouZ53mrkL46BvmI8', thumbnail: 'https://img.youtube.com/vi/TwdjOQMTaQ4/0.jpg', category: 'Advanced' },
    { title: 'Love Babbar', link: 'https://www.youtube.com/watch?v=EaK6aslcC5g&list=PLDzeHZWIZsTobi35C3I-tKB3tRDX6YxuA', thumbnail: 'https://img.youtube.com/vi/EaK6aslcC5g/0.jpg', category: 'Beginner' },
    { title: 'Rohit Negi', link: 'https://www.youtube.com/watch?v=gGlfzqPT-hE&list=PLQEaRBV9gAFte7vWOl3AWFABndCRCsIRQ', thumbnail: 'https://img.youtube.com/vi/gGlfzqPT-hE/0.jpg', category: 'Intermediate' },
    { title: 'Gate Smashers', link: 'https://www.youtube.com/watch?v=N2P7w22tN9c&pp=ygUJZ3JhcGggZHNh', thumbnail: 'https://img.youtube.com/vi/N2P7w22tN9c/0.jpg', category: 'Advanced' },
    { title: 'Abdul Bari', link: 'https://www.youtube.com/watch?v=pcKY4hjDrxk&pp=ygUJZ3JhcGggZHNh', thumbnail: 'https://img.youtube.com/vi/pcKY4hjDrxk/0.jpg', category: 'Beginner' }
  ];

  resources: Resource[] = [
    { title: 'Graph Data Structure and Algorithms - GeeksforGeeks', link: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
    { title: 'Graph Data Structure - WS Cube Tech', link: 'https://www.wscubetech.com/resources/dsa/graph-data-structure' },
    { title: 'Best Websites to Learn Heap and Graph Data Structures - Quora', link: 'https://www.quora.com/What-are-the-best-websites-to-learn-heap-and-graph-data-structures-with-practices' },
    { title: 'Introduction to Graphs - GeeksforGeeks', link: 'https://www.geeksforgeeks.org/introduction-to-graphs-data-structure-and-algorithm-tutorials/' },
    { title: 'Graphs in Data Structure - Simplilearn', link: 'https://www.simplilearn.com/tutorials/data-structure-tutorial/graphs-in-data-structure' },
    { title: 'Graph Algorithms - Tech Interview Handbook', link: 'https://www.techinterviewhandbook.org/algorithms/graph/' },
    { title: 'Top 13 Resources for Graph Theory and Algorithms - Neo4j', link: 'https://neo4j.com/blog/top-13-resources-graph-theory-algorithms/' },
    { title: 'How to Get Started with Data Structures - Reddit', link: 'https://www.reddit.com/r/learnprogramming/comments/ov7v91/how_do_i_get_started_with_data_structures_and/' }
  ];

  filteredVideos: Video[] = [];

  ngOnInit() {
    this.filteredVideos = [...this.videos];
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredVideos = this.videos.filter(video => {
      const matchesCategory = this.selectedCategory === 'All' || video.category === this.selectedCategory;
      const matchesSearch = this.searchTerm === '' || video.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  goToVideo(link: string) {
    window.open(link, '_blank');
  }
}