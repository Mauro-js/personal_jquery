const $ = (arg) => { 

    if (typeof arg === "function"){
        document.addEventListener('DOMContentLoaded', arg)
        return
    }

    let elements;
    if (typeof arg === 'string'){
        elements = document.querySelectorAll(arg);
    }

    if (arg instanceof HTMLElement){
        elements = [arg]
    }

    elements.css = (...args) => {
        const [property, value] = args;
        const propertyStringIsString = typeof property === 'string';

        elements.forEach(el => {
            if(propertyStringIsString) el.style[property] = value;
            else {
                const entriesCSS = Object.entries(property);
                entriesCSS.forEach(([property, value]) => {
                    el.style[property] = value
                })
            }
        });
        return elements;
    }

    elements.on = (event, callback) => {
        elements.forEach(el => {
            el.addEventListener(event, callback);
        })
        return elements;
    }

    elements.each = (fn) => {
        elements.forEach((el, index) => fn(index, el))
        return elements
    }

    elements.fadeIn = (duration = 1000) => {
        elements.forEach((el, index) => {
            const animation = el.animate([
                            { opacity: 0},
                            { opacity: 1 }
                        ], { duration });

            animation.onfinish = () => el.style.opacity = 1
        })
        return elements
    }

    return elements
}

