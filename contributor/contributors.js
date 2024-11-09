// Fetch data from GitHub API
async function fetchData() {
    try {

      // Track loading time (independent feature)
      trackLoadingTime(); // Log the start time of data fetching
  

      // Initialize an empty array to store all contributors
      let contributors = [];
      let page = 1;
      let totalContributors = 0;
  

      // Loop through pages until there are no more contributors
      while (true) {
        const contributorsResponse = await fetch(`https://api.github.com/repos/sakeel-103/DFS-BFS-Graph-Travers/contributors?page=${page}&per_page=100`);
        logApiRequest();  // Log API request count
        const contributorsData = await contributorsResponse.json();
        

        // Break the loop if no contributors are returned (i.e., end of pages)
        if (contributorsData.length === 0) break;
  

        // Push the new contributors to the contributors array
        contributors = [...contributors, ...contributorsData];
  

        // Move to the next page
        page++;

      }
  

      // Fetch repository stats
      const repoResponse = await fetch('https://api.github.com/repos/sakeel-103/DFS-BFS-Graph-Travers');
      logApiRequest();  // Log the repository stats request
      const repoData = await repoResponse.json();
  

      // Calculate the total contributions from all pages
      totalContributors = contributors.reduce((sum, contributor) => sum + contributor.contributions, 0);
  

      // Log the loading time (independent feature)
      displayLoadingTime(); // Log the end time and show how long it took to fetch data
  

      return { contributors, repoStats: repoData, totalContributions: totalContributors };
    } catch (error) {
      console.error('Error fetching data:', error);
      displayError('Failed to load data. Please try again later.');
      return { contributors: [], repoStats: {}, totalContributions: 0 };
    }

  }
  

  // Log the number of requests made to the GitHub API (independent feature)
  let apiRequestCount = 0;
  

  function logApiRequest() {

    apiRequestCount++;
    console.log(`API Requests Made: ${apiRequestCount}`);

  }
  

  // Track the loading time of the data fetching process (independent feature)
  let fetchStartTime;
  let fetchEndTime;
  

  function trackLoadingTime() {

    fetchStartTime = new Date();
    console.log('Fetching data started...');

  }

  
  // Calculate and display the loading time (independent feature)
  function displayLoadingTime() {

    fetchEndTime = new Date();
    const loadingTime = (fetchEndTime - fetchStartTime) / 1000; // in seconds
    console.log(`Data fetching completed in ${loadingTime} seconds.`);

  }

  
  // Render stats
  function renderStats(repoStats, contributorsCount, totalContributions) {
    const statsGrid = document.getElementById('statsGrid');
    const stats = [
      { label: 'Contributors', value: contributorsCount, icon: 'users' },
      { label: 'Total Contributions', value: totalContributions, icon: 'git-commit' },
      { label: 'GitHub Stars', value: repoStats.stargazers_count || 0, icon: 'star' },
      { label: 'Forks', value: repoStats.forks_count || 0, icon: 'git-branch' }
    ];
  

    statsGrid.innerHTML = stats.map(stat => `
      <div class="contributor-stat-card animate-card">
        <div class="contributor-icon">${getIcon(stat.icon)}</div>
        <h3>${stat.value}</h3>
        <p>${stat.label}</p>
      </div>
    `).join('');

  }



  
  // Render contributors
  function renderContributors(contributors) {

    const contributorsGrid = document.getElementById('contributorsGrid');
    contributorsGrid.innerHTML = contributors.map(contributor => `
      <div class="contributor-contributor-card animate-card">
        <img src="${contributor.avatar_url}" alt="${contributor.login}" class="contributor-avatar">
        <h3>${contributor.login}</h3>
        <p>${contributor.type}</p>
        <div class="contributor-contributions">${contributor.contributions} contributions</div>
        <div class="contributor-footer">
          <a href="${contributor.html_url}" target="_blank" rel="noopener noreferrer">
            ${getIcon('external-link')} View Profile
          </a>
          ${getIcon('github')}
        </div>
      </div>
    `).join('');

  }
  

  // Show loading spinner
  function showLoading() {

    const loading = document.getElementById('loading');
    loading.style.display = 'flex';

  }
  
  
  // Hide loading spinner
  function hideLoading() {

    const loading = document.getElementById('loading');
    loading.style.display = 'none';

  }
  

  // Display error messages
  function displayError(message) {

    const errorBox = document.getElementById('errorBox');
    errorBox.innerText = message;
    errorBox.classList.remove('hidden');

  }
  

  // Initialize the page
  async function init() {

    showLoading();
    const { contributors, repoStats, totalContributions } = await fetchData();
  
    if (contributors.length > 0 && Object.keys(repoStats).length > 0) {
      renderStats(repoStats, contributors.length, totalContributions);
      renderContributors(contributors);
    }
  
    hideLoading();

  }
  

  // Handle form submission
  document.getElementById('subscribeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const notification = document.getElementById('notification');
    
    notification.textContent = `Thank you for subscribing with ${email}. We'll keep you updated!`;
    notification.classList.remove('hidden');
    
    document.getElementById('emailInput').value = '';
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
  });
  

  // Scroll to contribute section
  function scrollToContribute() {

    document.getElementById('contribute').scrollIntoView({ behavior: 'smooth' });

  }
  

  // Initialize the page when the DOM is loaded
  document.addEventListener('DOMContentLoaded', init);
  

  // Helper function to get icons (reusable)
  function getIcon(name) {

    const icons = {
      'users': `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      'git-commit': `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line></svg>`,
      'star': `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      'git-branch': `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>`,
      'external-link': `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
      'github': `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`
    };
    return icons[name] || '';

  }
  

  // Utility Functions
  
  // Format date in a human-readable form (e.g., 'October 22, 2024')
  function formatDate(dateString) {

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);

  }
  

  // Get a random color (for future use in styling or debugging)
  function getRandomColor() {

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

  }
  

  // Calculate the average number of contributions per contributor
  function calculateAverageContributions(contributors) {

    if (contributors.length === 0) return 0;
    const totalContributions = contributors.reduce((sum, contributor) => sum + contributor.contributions, 0);
    return totalContributions / contributors.length;

  }
  

  // Log the average contributions (for debugging purposes)
  function logAverageContributions(contributors) {

    const avgContributions = calculateAverageContributions(contributors);
    console.log(`Average Contributions: ${avgContributions}`);

  }
  

  // Add a delayed function execution (for testing purposes)
  function delayExecution(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

  }
  

  // Event listener for window resizing (for future responsiveness handling)
  window.addEventListener('resize', function() {
    console.log('Window resized. New dimensions:', window.innerWidth, window.innerHeight);
  });

  
  // Event listener for scroll position (for lazy loading or infinite scrolling in the future)
  window.addEventListener('scroll', function() {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
      console.log('Near bottom of the page. Ready to load more content.');
    }
  });

  
  // Toggle the visibility of an element (for error or notification boxes)
  function toggleVisibility(elementId) {
    
    const element = document.getElementById(elementId);
    if (element.style.display === 'none' || element.style.display === '') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }

  }
  

  // Change the background color of a section (useful for highlighting)
  function highlightSection(sectionId) {
    
    const section = document.getElementById(sectionId);
    section.style.backgroundColor = getRandomColor();
    setTimeout(() => {
      section.style.backgroundColor = '';
    }, 3000);

  }
  

  // Disable an element (for UI interactions like buttons)
  function disableElement(elementId) {

    const element = document.getElementById(elementId);
    element.disabled = true;

  }
  

  // Enable an element (for UI interactions like buttons)
  function enableElement(elementId) {

    const element = document.getElementById(elementId);
    element.disabled = false;

  }

  
  // Log the current state of contributors
  function logContributorsState(contributors) {

    console.log('Current contributors state:', contributors);

  }
  

  // Log the repository stats
  function logRepoStats(repoStats) {

    console.log('Repository Stats:', repoStats);

  }
  

  // Log the total contributions
  function logTotalContributions(totalContributions) {

    console.log(`Total Contributions: ${totalContributions}`);

  }
  

  // Log API response for debugging
  function logApiResponse(response) {

    console.log('API Response:', response);

  }
  

  