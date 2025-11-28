document.addEventListener('DOMContentLoaded', () => {
    const cake = document.getElementById('animated-cake');
    if (!cake) return;

    const frameCount = 32;
    const framePath = (index) => {
        const padded = index.toString().padStart(5, '0');
        return `assets/cake 2/cake 2_${padded}.png`;
    };

    const preload = () => {
        for (let i = 0; i < frameCount; i += 1) {
            const img = new Image();
            img.src = framePath(i);
        }
    };

    let currentFrame = 0;


    const updateFrame = () => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        const targetFrame = Math.min(frameCount - 1, Math.floor(progress * frameCount));

        if (targetFrame !== currentFrame) {
            cake.src = framePath(targetFrame);
            currentFrame = targetFrame;
        }
    };

    preload();
    cake.src = framePath(0);
    
    // Cake animation on scroll
    window.addEventListener('scroll', () => requestAnimationFrame(updateFrame));
});
