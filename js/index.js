import { wrapper } from './main.js';
import { darkBGscore } from './modalScore.js';
import { darkBGWin } from './modalSuccess.js';

const body = document.body;

body.appendChild(wrapper);
body.appendChild(darkBGscore);
body.appendChild(darkBGWin);
