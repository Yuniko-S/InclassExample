document.addEventListener('DOMContentLoaded', () => {
    const cake = document.getElementById('animated-cake');
    if (!cake) return;
  
    const frameCount = 32;
    const framePath = (index) => {
      const padded = index.toString().padStart(5, '0');
      return `assets/cake 2/cake 2_${padded}.png`;
    };
  
    // preload
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
    }
  
    let currentFrame = 0;
    let startScroll = 0;
    let endScroll = 0;
    let isActive = false;
  
    const updateFrame = () => {
      if (!isActive) return;
  
      const scrollY = window.scrollY;
  
      if (scrollY < startScroll || scrollY > endScroll) return;
  
      const progress = Math.min(
        1,
        Math.max(
          0,
          (scrollY - startScroll) / (endScroll - startScroll)
        )
      );
  
      const targetFrame = Math.floor(
        progress * (frameCount - 1)
      );
  
      if (targetFrame !== currentFrame) {
        cake.src = framePath(targetFrame);
        currentFrame = targetFrame;
      }
    };
  
    const onScroll = () => requestAnimationFrame(updateFrame);
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
  
        const rect = cake.getBoundingClientRect();
        const scrollTop = window.scrollY;
  
        //再生範囲を広げる
        startScroll = scrollTop + rect.top - window.innerHeight * 0.7;
        endScroll   = scrollTop + rect.top + window.innerHeight * 0.3;
  
        isActive = true;
        window.addEventListener('scroll', onScroll);
      },
      {
        threshold: 0.1
      }
    );
  
    cake.src = framePath(0);
    observer.observe(cake);
  });
  