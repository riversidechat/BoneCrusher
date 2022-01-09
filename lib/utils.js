function CreateBaseDiv(id)
{
  const parent = document.querySelector("#main");
  const el = document.createElement("div");
  el.setAttribute("id", id);
  parent.appendChild(el);
  return "#" + id;
}
function CreateElement(type, id, path)
{
  const parent = document.querySelector(path);
  const el = document.createElement(type);
  el.setAttribute("id", id);
  parent.appendChild(el);
  return "#" + id;
}

function min(a,b) { return (a < b)? a : b; }
function max(a,b) { return (a > b)? a : b; }
function clamp(val, minV, maxV) { return max(min(val, maxV), minV); }
function RandomInt(min, max) { return Math.round(Math.random() * (max - min) + min); }
function RandomFloat(min, max) { return Math.random() * (max - min) + min; }
