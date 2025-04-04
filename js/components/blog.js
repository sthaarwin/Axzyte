let currentPage = 1;
const entriesPerPage = 3;
let totalPages = 1;

function initBlogSystem() {
    generatePaginatedBlogEntries(currentPage);
    setupBlogInteractions();
    setupBlogToggle();
    setupMobileScroll();
}

function generatePaginatedBlogEntries(page) {
    const blogEntriesContainer = document.getElementById('blogEntries');
    
    blogEntriesContainer.innerHTML = '';
    
    if (typeof blogData !== 'undefined' && blogData.length > 0) {
        totalPages = Math.ceil(blogData.length / entriesPerPage);
        
        const startIndex = (page - 1) * entriesPerPage;
        const endIndex = Math.min(startIndex + entriesPerPage, blogData.length);
        
        const currentEntries = blogData.slice(startIndex, endIndex);
        
        currentEntries.forEach(blog => {
            const blogEntry = document.createElement('div');
            blogEntry.className = 'blog-entry';
            blogEntry.id = blog.id;
            
            let blogContent = `
                <h3>${blog.title}</h3>
                <p class="blog-date">${blog.date}</p>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <a href="#" class="read-more" data-blog="${blog.id}-content">Read More</a>
                <div class="blog-content" id="${blog.id}-content">
            `;
            
            blog.content.forEach(paragraph => {
                blogContent += `<p>${paragraph}</p>`;
            });
            
            blogContent += `<a href="#" class="read-less">Read Less</a>
                </div>`;
            
            blogEntry.innerHTML = blogContent;
            
            blogEntriesContainer.appendChild(blogEntry);
        });
        
        if (totalPages > 1) {
            addPaginationControls(blogEntriesContainer, page, totalPages);
        }
    } else {
        blogEntriesContainer.innerHTML = '<p>No blog entries available at this time.</p>';
    }
    
    setupBlogInteractions();
}

function addPaginationControls(container, currentPage, totalPages) {
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'blog-pagination';
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="bx bx-chevron-left"></i> Prev';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            navigateToPage(currentPage - 1);
        }
    });
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next <i class="bx bx-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            navigateToPage(currentPage + 1);
        }
    });
    
    const pageInfo = document.createElement('div');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'page-numbers';
    
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number' + (i === currentPage ? ' active' : '');
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            navigateToPage(i);
        });
        pageNumbers.appendChild(pageNumber);
    }
    
    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(pageInfo);
    paginationDiv.appendChild(pageNumbers);
    paginationDiv.appendChild(nextButton);
    
    container.appendChild(paginationDiv);
}

function navigateToPage(pageNumber) {
    currentPage = pageNumber;
    
    const blogEntries = document.querySelector('.blog-entries');
    if (blogEntries) {
        blogEntries.scrollTop = 0;
    }
    
    generatePaginatedBlogEntries(currentPage);
}

function generateBlogEntries() {
    generatePaginatedBlogEntries(1);
}

function setupBlogInteractions() {
    const blogTitles = document.querySelectorAll('.blog-entry h3');
    blogTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const blogEntry = this.closest('.blog-entry');
            
            if (blogEntry.classList.contains('expanded')) {
                blogEntry.classList.remove('expanded');
                const contentDiv = blogEntry.querySelector('.blog-content');
                contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
                setTimeout(() => {
                    contentDiv.style.maxHeight = '0';
                    setTimeout(() => {
                        contentDiv.style.display = 'none';
                        contentDiv.style.maxHeight = '';
                    }, 300);
                }, 10);
            } else {
                blogEntry.classList.add('expanded');
                const contentId = blogEntry.querySelector('.read-more').getAttribute('data-blog');
                const contentDiv = document.getElementById(contentId);
                contentDiv.style.display = 'block';
                contentDiv.style.maxHeight = '0';
                setTimeout(() => {
                    contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
                    setTimeout(() => {
                        contentDiv.style.maxHeight = '';
                    }, 300);
                }, 10);
            }
        });
    });
    
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogEntry = this.closest('.blog-entry');
            
            if (!blogEntry.classList.contains('expanded')) {
                blogEntry.classList.add('expanded');
                const contentId = this.getAttribute('data-blog');
                const contentDiv = document.getElementById(contentId);
                contentDiv.style.display = 'block';
                contentDiv.style.maxHeight = '0';
                setTimeout(() => {
                    contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
                    setTimeout(() => {
                        contentDiv.style.maxHeight = '';
                    }, 300);
                }, 10);
            }
        });
    });
    
    const readLessLinks = document.querySelectorAll('.read-less');
    readLessLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogEntry = this.closest('.blog-entry');
            const contentDiv = this.closest('.blog-content');
            
            contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
            setTimeout(() => {
                contentDiv.style.maxHeight = '0';
                blogEntry.classList.remove('expanded');
                setTimeout(() => {
                    contentDiv.style.display = 'none';
                    contentDiv.style.maxHeight = '';
                }, 300);
            }, 10);
        });
    });
}

function setupBlogToggle() {
    document.getElementById('toggleBlogs').addEventListener('click', function(e) {
        e.preventDefault();
        
        var blogsContainer = document.getElementById('blogsContainer');
        var formContainer = document.getElementById('formContainer');
        
        blogsContainer.classList.toggle('visible');
        
        if (formContainer && formContainer.classList.contains('visible')) {
            formContainer.classList.remove('visible');
        }
        
        if (!document.querySelector('.blog-close-btn')) {
            const closeButton = document.createElement('button');
            closeButton.className = 'blog-close-btn';
            closeButton.innerHTML = '<i class="bx bx-x"></i>';
            closeButton.addEventListener('click', function() {
                blogsContainer.classList.remove('visible');
                document.body.style.overflow = '';
                
                document.dispatchEvent(new CustomEvent('blogClosed'));
            });
            blogsContainer.appendChild(closeButton);
        }
        
        if (blogsContainer.classList.contains('visible')) {
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                const blogEntries = document.querySelector('.blog-entries');
                if (blogEntries) blogEntries.scrollTop = 0;
            }, 50);
        } else {
            document.body.style.overflow = '';
        }
    });
}

function setupMobileScroll() {
    const blogsContainer = document.getElementById('blogsContainer');
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        blogsContainer.addEventListener('touchstart', function(e) {
        }, { passive: true });
        
        blogsContainer.addEventListener('scroll', function() {
        }, { passive: true });
        
        const oldButton = document.getElementById('blog-close-btn');
        if (oldButton) {
            oldButton.remove();
        }
    }
} 

window.addEventListener('resize', setupMobileScroll);
