// Blog functionality

// Pagination variables
let currentPage = 1;
const entriesPerPage = 3;
let totalPages = 1;

function initBlogSystem() {
    // Generate blog entries with pagination
    generatePaginatedBlogEntries(currentPage);
    
    // Setup blog interactions
    setupBlogInteractions();
    
    // Setup blog container toggle
    setupBlogToggle();
    
    // Setup mobile-specific blog features
    setupMobileScroll();
}

// Function to generate paginated blog entries
function generatePaginatedBlogEntries(page) {
    const blogEntriesContainer = document.getElementById('blogEntries');
    
    // Clear existing entries if any
    blogEntriesContainer.innerHTML = '';
    
    // Check if blogData exists (from blogs.js)
    if (typeof blogData !== 'undefined' && blogData.length > 0) {
        // Calculate total pages
        totalPages = Math.ceil(blogData.length / entriesPerPage);
        
        // Calculate start and end index for current page
        const startIndex = (page - 1) * entriesPerPage;
        const endIndex = Math.min(startIndex + entriesPerPage, blogData.length);
        
        // Get current page entries
        const currentEntries = blogData.slice(startIndex, endIndex);
        
        // Loop through current page blog data and create entries
        currentEntries.forEach(blog => {
            const blogEntry = document.createElement('div');
            blogEntry.className = 'blog-entry';
            blogEntry.id = blog.id;
            
            // Create content for blog entry
            let blogContent = `
                <h3>${blog.title}</h3>
                <p class="blog-date">${blog.date}</p>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <a href="#" class="read-more" data-blog="${blog.id}-content">Read More</a>
                <div class="blog-content" id="${blog.id}-content">
            `;
            
            // Add paragraphs from content array
            blog.content.forEach(paragraph => {
                blogContent += `<p>${paragraph}</p>`;
            });
            
            // Add read less link
            blogContent += `<a href="#" class="read-less">Read Less</a>
                </div>`;
            
            // Set the HTML content
            blogEntry.innerHTML = blogContent;
            
            // Add to container
            blogEntriesContainer.appendChild(blogEntry);
        });
        
        // Add pagination controls if we have more than one page
        if (totalPages > 1) {
            addPaginationControls(blogEntriesContainer, page, totalPages);
        }
    } else {
        // Fallback if blog data is not available
        blogEntriesContainer.innerHTML = '<p>No blog entries available at this time.</p>';
    }
    
    // Re-setup blog interactions after content changes
    setupBlogInteractions();
}

// Function to add pagination controls
function addPaginationControls(container, currentPage, totalPages) {
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'blog-pagination';
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="bx bx-chevron-left"></i> Prev';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            navigateToPage(currentPage - 1);
        }
    });
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next <i class="bx bx-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            navigateToPage(currentPage + 1);
        }
    });
    
    // Page information
    const pageInfo = document.createElement('div');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Page numbers for desktop
    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'page-numbers';
    
    // Determine which page numbers to show
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    
    // Adjust if we're near the end
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }
    
    // Add page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number' + (i === currentPage ? ' active' : '');
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            navigateToPage(i);
        });
        pageNumbers.appendChild(pageNumber);
    }
    
    // Assemble pagination controls
    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(pageInfo);
    paginationDiv.appendChild(pageNumbers);
    paginationDiv.appendChild(nextButton);
    
    // Add to container
    container.appendChild(paginationDiv);
}

// Function to navigate to a specific page
function navigateToPage(pageNumber) {
    currentPage = pageNumber;
    
    // Scroll to top of blog entries before loading new page
    const blogEntries = document.querySelector('.blog-entries');
    if (blogEntries) {
        blogEntries.scrollTop = 0;
    }
    
    // Generate new page content
    generatePaginatedBlogEntries(currentPage);
}

// Update the original generateBlogEntries function to use pagination
function generateBlogEntries() {
    generatePaginatedBlogEntries(1);
}

// Setup event listeners for blog interactions
function setupBlogInteractions() {
    // Read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogEntry = this.closest('.blog-entry');
            blogEntry.classList.add('expanded');
            const contentId = this.getAttribute('data-blog');
            document.getElementById(contentId).style.display = 'block';
        });
    });
    
    // Read less links
    const readLessLinks = document.querySelectorAll('.read-less');
    readLessLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogEntry = this.closest('.blog-entry');
            blogEntry.classList.remove('expanded');
            this.closest('.blog-content').style.display = 'none';
        });
    });
}

// Setup blog toggle
function setupBlogToggle() {
    document.getElementById('toggleBlogs').addEventListener('click', function(e) {
        e.preventDefault();
        
        var blogsContainer = document.getElementById('blogsContainer');
        var formContainer = document.getElementById('formContainer');
        
        // Toggle blogs container visibility
        blogsContainer.classList.toggle('visible');
        
        // Hide form container if it's visible
        if (formContainer && formContainer.classList.contains('visible')) {
            formContainer.classList.remove('visible');
        }
        
        // Add close button if not already present
        if (!document.querySelector('.blog-close-btn')) {
            const closeButton = document.createElement('button');
            closeButton.className = 'blog-close-btn';
            closeButton.innerHTML = '<i class="bx bx-x"></i>';
            closeButton.addEventListener('click', function() {
                blogsContainer.classList.remove('visible');
                document.body.style.overflow = '';
            });
            blogsContainer.appendChild(closeButton);
        }
        
        // Handle scrolling
        if (blogsContainer.classList.contains('visible')) {
            // Prevent body scrolling while blog is open
            document.body.style.overflow = 'hidden';
            
            // Reset scroll position
            setTimeout(() => {
                const blogEntries = document.querySelector('.blog-entries');
                if (blogEntries) blogEntries.scrollTop = 0;
            }, 50);
        } else {
            // Restore body scrolling when closed
            document.body.style.overflow = '';
        }
    });
}

// Ensure blog content is scrollable on mobile
function setupMobileScroll() {
    const blogsContainer = document.getElementById('blogsContainer');
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        // Add proper touch event listeners for mobile scrolling
        blogsContainer.addEventListener('touchstart', function(e) {
            // This is intentionally left empty to ensure default touch behavior
        }, { passive: true });
        
        // Add scroll listener to detect if scrolling is working
        blogsContainer.addEventListener('scroll', function() {
            // This is just to ensure the scroll event is captured
        }, { passive: true });
        
        // Mobile doesn't need the additional close button since we have the fixed one
        const oldButton = document.getElementById('blog-close-btn');
        if (oldButton) {
            oldButton.remove();
        }
    }
}

// Run setup on resize
window.addEventListener('resize', setupMobileScroll);
