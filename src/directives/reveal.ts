import type { Directive } from "vue";

let _observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (!_observer && typeof window !== "undefined") {
    _observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            _observer!.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
  }
  return _observer;
}

export const vReveal: Directive = {
  mounted(el: HTMLElement, binding) {
    el.classList.add("reveal");
    if (binding.value?.delay) {
      el.style.transitionDelay = binding.value.delay;
    }
    getObserver()?.observe(el);
  },
  unmounted(el: HTMLElement) {
    getObserver()?.unobserve(el);
  },
};
