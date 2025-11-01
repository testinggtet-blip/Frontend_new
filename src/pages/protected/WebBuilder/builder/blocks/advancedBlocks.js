// Advanced Blocks
export const advancedBlocks = [
    {
        id: 'custom-code',
        label: 'Custom Code',
        media: `
          <svg viewBox="0 0 24 24">
            <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
          </svg>
        `,
        category: 'Advanced',
        activate: true,
        select: true,
        content: { type: 'custom-code' },
    },
    {
        id: 'tooltip',
        label: 'Tooltip',
        media: `
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m0 2v12h16V4H4m2 2h12v2H6V6m0 4h12v2H6v-2m0 4h7v2H6v-2z"></path>
            </svg>
        `,
        category: 'Advanced',
        content: `
            <div class="tooltip-container" style="position: relative; display: inline-block;">
                <span class="tooltip-text" style="visibility: hidden; background-color: black; color: #fff; text-align: center; border-radius: 5px; padding: 5px; position: absolute; z-index: 1; bottom: 125%; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 0.3s;">
                    Tooltip Text
                </span>
                <span style="border-bottom: 1px dotted black; cursor: pointer;">Hover over me</span>
            </div>
        `,
        script: `
            const tooltipText = this.querySelector('.tooltip-text');
            this.onmouseenter = () => tooltipText.style.visibility = tooltipText.style.opacity = '1';
            this.onmouseleave = () => tooltipText.style.visibility = tooltipText.style.opacity = '0';
        `
    },
    {
        id: 'carousel',
        label: 'Carousel',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 19h10V4H7v15zm-2-2h14V6H5v11z"/><path fill="currentColor" d="M10 8h4v8h-4z"/></svg>',
        category: 'Advanced',
        content: `
        <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Slide 1">
                </div>
                <div class="carousel-item">
                    <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Slide 2">
                </div>
                <div class="carousel-item">
                    <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Slide 3">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        `
    },
    {
        id: 'accordion',
        label: 'Accordion',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>',
        category: 'Advanced',
        content: `
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        Section 1
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show">
                    <div class="accordion-body">
                        Content for section 1. Click to expand and collapse.
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                        Section 2
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        Content for section 2. Click to expand and collapse.
                    </div>
                </div>
            </div>
        </div>
        `
    },
    {
        id: 'pricing-table',
        label: 'Pricing Table',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        category: 'Advanced',
        content: `
        <div class="pricing-table row">
            <div class="col-md-4 pricing-plan">
                <h3>Basic</h3>
                <div class="price">$9.99</div>
                <ul class="list-unstyled">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
                <button class="btn btn-primary">Choose Plan</button>
            </div>
            <div class="col-md-4 pricing-plan featured">
                <h3>Pro</h3>
                <div class="price">$19.99</div>
                <ul class="list-unstyled">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                    <li>Feature 4</li>
                </ul>
                <button class="btn btn-primary">Choose Plan</button>
            </div>
            <div class="col-md-4 pricing-plan">
                <h3>Enterprise</h3>
                <div class="price">$29.99</div>
                <ul class="list-unstyled">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                    <li>Feature 4</li>
                    <li>Feature 5</li>
                </ul>
                <button class="btn btn-primary">Choose Plan</button>
            </div>
        </div>
        `
    },
    {
        id: 'countdown',
        label: 'Countdown',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z"></path></svg>',
        category: 'Advanced',
        content: `
        <div class="countdown" data-time="2024-12-31T23:59:59">
            <p>Countdown Timer</p>
            <p>00:00:00</p>
        </div>
        `
    },
    {
        id: 'typed-text',
        label: 'Typed Text',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/></svg>',
        category: 'Advanced',
        content: `<div class="typed-text" data-text="Hello, World!">Hello, World!</div>`,
    }
];
