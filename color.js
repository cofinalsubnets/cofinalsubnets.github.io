const { atan2, floor, sqrt, random, PI } = Math;

let lastX = floor(random() * window.innerWidth),
    lastY = floor(random() * window.innerHeight);

// set the background color based on mouse position
const colorize = ({x, y}) => {
  // limit updates to about 60/s
  window.removeEventListener("mousemove", colorize);
  window.setTimeout(() => window.addEventListener("mousemove", colorize), 17);

  const // compute hsl
    { innerWidth: width, innerHeight: height} = window, // X Y dimension of window
    diag = sqrt(width**2 + height**2),                  // diagonal length
    x0 = floor(width / 2), y0 = floor(height/2),        // center point (origin)
    x1 = x - x0, y1 = y0 - y,                           // adjusted event coordinate
    dist = sqrt((lastX - x) ** 2 + (lastY - y) ** 2),   // distance from last event
    hue = (atan2(y1, x1) * 180) / PI,                   // hue <- angle of event from origin
    lit = 80 + 80 * dist / diag,                        // lightness <- distance from last event
    sat = 30 + 120 * sqrt(x1**2 + y1**2) / diag,        // saturation <- distance from origin
    hsl = `hsl(${hue},${sat}%,${lit}%)`;                // hsl css parameter value string

  // set color and last event coordinates
  document.querySelector(':root').style.setProperty('--bg', hsl);
  lastX = x, lastY = y;
};

colorize({x: lastX, y: lastY});
