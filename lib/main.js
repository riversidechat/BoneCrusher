class Game
{
  constructor()
  {
    this.DeltaTime = 0;
    this.OldTime = 0;
    this.FPS = 0;
    this.SafeDeltaTime = 0;
    this.ticks = 0;
    this.funcName;
  }
  StartUpdateFunction(funcName)
  {
    this.funcName = funcName;
    window.requestAnimationFrame(funcName);
  }
  Update(timeStamp)
  {
    this.ticks ++;
    this.DeltaTime = (timeStamp - this.OldTime) / 1000;
    this.SafeDeltaTime = clamp(this.DeltaTime, 0, (1 / 60));
    this.FPS = (1 / this.DeltaTime);
    this.OldTime = timeStamp;
  }
  RecallUpdate()
  {
    window.requestAnimationFrame(this.funcName);
  }
}
class Renderer
{
  constructor(id, width, height)
  {
    this.ctx = document.querySelector(id).getContext('2d');
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;

    this.Width = width;
    this.Height = height;

    this.render = {
      scale: 1.5,
      lineWidth: 1,
      lineCap: "round",
      lineJoin: "round",
      fill: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      },
      stroke: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      }
    }
  }
  GetFill()
  {
    return `rgba(${this.render.fill.r}, ${this.render.fill.g}, ${this.render.fill.b}, ${this.render.fill.a})`;
  }
  GetStroke()
  {
    return `rgba(${this.render.stroke.r}, ${this.render.stroke.g}, ${this.render.stroke.b}, ${this.render.stroke.a})`;
  }
  SetFill(r, g, b, a)
  {
    this.render.fill.r = r;
    this.render.fill.g = g;
    this.render.fill.b = b;
    if(a)
    {
      this.render.fill.a = a;
    }
  }
  SetStroke(r, g, b, a)
  {
    this.render.stroke.r = r;
    this.render.stroke.g = g;
    this.render.stroke.b = b;
    if(a)
    {
      this.render.stroke.a = a;
    }
  }
  ResetColor()
  {
    this.SetFill(0, 0, 0, 1);
    this.SetStroke(0, 0, 0, 1);
  }
  SetLineWidth(lineWidth)
  {
    this.render.lineWidth = lineWidth;
  }
  SetRenderInfo(scale, lineWidth, lineCap, lineJoin, fill, stroke)
  {
    if(scale)
    {
      this.render.scale = scale;
    }
    if(lineWidth)
    {
      this.render.lineWidth = lineWidth;
    }
    if(lineCap)
    {
      this.render.lineCap = lineCap;
    }
    if(lineJoin)
    {
      this.render.lineJoin = lineJoin;
    }
    if(fill)
    {
      this.SetFill(fill.r, fill.g, fill.b, fill.a)
    }
    if(stroke)
    {
      this.SetStroke(stroke.r, stroke.g, stroke.b, stroke.a)
    }
  }
  FullScreen()
  {
    this.Width = window.innerWidth;
    this.Height = window.innerHeight;
    this.ctx.canvas.width = this.Width;
    this.ctx.canvas.height = this.Height;
  }
  SetScreenSize(w, h)
  {
    this.Width = w;
    this.Height = h;
    this.ctx.canvas.width = this.Width;
    this.ctx.canvas.height = this.Height;
  }
  FillScreen()
  {
    this.ctx.fillStyle = this.GetFill();
    this.ctx.fillRect(0, 0, this.Width, this.Height);
  }
  DrawRect(x1, y1, x2, y2)
  {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.lineCap = this.render.lineCap;
    this.ctx.lineJoin = this.render.lineJoin;
    this.ctx.lineWidth = this.render.lineWidth / this.render.scale;

    this.ctx.beginPath();
    this.ctx.moveTo(x1 / this.render.scale, y1 / this.render.scale);
    this.ctx.lineTo(x1 / this.render.scale, y2 / this.render.scale);
    this.ctx.lineTo(x2 / this.render.scale, y2 / this.render.scale);
    this.ctx.lineTo(x2 / this.render.scale, y1 / this.render.scale);
    this.ctx.lineTo(x1 / this.render.scale, y1 / this.render.scale);

    this.ctx.stroke();
  }
  DrawLine(x1, y1, x2, y2)
  {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.lineCap = this.render.lineCap;
    this.ctx.lineJoin = this.render.lineJoin;
    this.ctx.lineWidth = this.render.lineWidth / this.render.scale;

    this.ctx.beginPath();
    this.ctx.moveTo(x1 / this.render.scale, y1 / this.render.scale);
    this.ctx.lineTo(x2 / this.render.scale, y2 / this.render.scale);

    this.ctx.stroke();
  }
  DrawCircle(x, y, radius)
  {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.lineCap = this.render.lineCap;
    this.ctx.lineJoin = this.render.lineJoin;
    this.ctx.lineWidth = this.render.lineWidth / this.render.scale;

    this.ctx.beginPath();
    this.ctx.arc(x / this.render.scale, y / this.render.scale, radius / this.render.scale, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  DrawFillCircle(x, y, radius)
  {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.fillStyle = this.GetFill();
    this.ctx.lineCap = this.render.lineCap;
    this.ctx.lineJoin = this.render.lineJoin;
    this.ctx.lineWidth = this.render.lineWidth / this.render.scale;

    this.ctx.beginPath();
    this.ctx.arc(x / this.render.scale, y / this.render.scale, radius / this.render.scale, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
  DrawFillCircleNoStroke(x, y, radius)
  {
    this.ctx.fillStyle = this.GetFill();
    this.ctx.lineCap = this.render.lineCap;
    this.ctx.lineJoin = this.render.lineJoin;
    this.ctx.lineWidth = this.render.lineWidth / this.render.scale;

    this.ctx.beginPath();
    this.ctx.arc(x / this.render.scale, y / this.render.scale, radius / this.render.scale, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  DrawEllipse(x, y, radiusX, radiusY)
  {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.lineCap = this.render.lineCap;
    this.ctx.lineJoin = this.render.lineJoin;
    this.ctx.lineWidth = this.render.lineWidth / this.render.scale;

    this.ctx.beginPath();
    this.ctx.ellipse(x / this.render.scale, y / this.render.scale, radiusX / this.render.scale, radiusY / this.render.scale, 0, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  DrawFillEllipse(x, y, radiusX, radiusY)
  {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.fillStyle = this.GetFill();
    this.ctx.lineCap = this.render.lineCap;
    this.ctx.lineJoin = this.render.lineJoin;
    this.ctx.lineWidth = this.render.lineWidth / this.render.scale;

    this.ctx.beginPath();
    this.ctx.ellipse(x / this.render.scale, y / this.render.scale, radiusX / this.render.scale, radiusY / this.render.scale, 0, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
  DrawBar(x, y, min, max, value, size, colors)
  {
    var prev = this.render.lineWidth;
    this.SetLineWidth(size);
    this.SetStroke(255, 255, 255, 0.8);

    this.DrawLine(x + min, y, x + max, y);
    this.SetLineWidth(size - 10);
    this.SetStroke(0, 0, 0, 0.8);
    this.DrawLine(x + min, y, x + max, y);

    this.SetLineWidth(size - 20);
    this.SetStroke(colors.r, colors.g, colors.b, 0.8);
    this.DrawLine(x + min, y, x + min + clamp(value, 0, max - min), y);

    this.SetLineWidth(prev);
  }
}
class Camera
{
  constructor(x, y, render)
  {
    this.x = x - render.Width/2;
    this.y = y - render.Height/2;
  }
  MoveTo(x, y, render)
  {
    this.x = x;
    this.y = y;
  }
  MoveTo_Soft(x, y, render, game)
  {
    this.x += (((x - render.Width / 2) - this.x) / 16) * 60 * game.SafeDeltaTime;
    this.y += (((y - render.Height / 2) - this.y) / 16) * 60 * game.SafeDeltaTime;
  }
  MoveTo_Medium(x, y, render, game)
  {
    this.x += (((x - render.Width / 2) - this.x) / 8) * 60 * game.SafeDeltaTime;
    this.y += (((y - render.Height / 2) - this.y) / 8) * 60 * game.SafeDeltaTime;
  }
  MoveTo_Hard(x, y, render, game)
  {
    this.x += (((x - render.Width / 2) - this.x) / 4) * 60 * game.SafeDeltaTime;
    this.y += (((y - render.Height / 2) - this.y) / 4) * 60 * game.SafeDeltaTime;
  }
  MoveTo_Custom(x, y, friction, render, game)
  {
    this.x += (((x - render.Width / 2) - this.x) / friction) * 60 * game.SafeDeltaTime;
    this.y += (((y - render.Height / 2) - this.y) / friction) * 60 * game.SafeDeltaTime;
  }
}
class Player
{
  constructor(x, y, w, h, bbw, bbh, event, floorHeight)
  {
    this.x = x;
    this.y = y;

    this.respawn = {
      x: x,
      y: y
    }

    this.dash = 0;
    this.dashSec = 1;
    this.dashV = 50;
    this.maxDash = 25;

    this.direction = 1;

    this.xv = 0;
    this.yv = 0;

    this.w = w;
    this.h = h;

    this.event = event;

    this.floorHeight = floorHeight;
    this.Gravity = 0.6;
    this.friction = 1.1;
    this.bbw = bbw;
    this.bbh = bbh;
  }
  Draw(render, cam)
  {
    render.SetStroke(255, 255, 255, 1);
    render.SetLineWidth(10);
    render.DrawLine(-100000, this.floorHeight - cam.y, 100000, this.floorHeight - cam.y);
    render.DrawRect(this.x - cam.x, this.y - cam.y, this.x + this.w - cam.x, this.y + this.h - cam.y);
  }
  Update(render, cam, game, group)
  {
    this.dash += game.SafeDeltaTime;
    this.dash = clamp(this.dash, 0, this.maxDash);

    if(GetKeyState(Keys.space) && this.dash > this.dashSec && this.xv < this.dashV / 2)
    {
      this.xv = this.dashV * this.direction;
      this.dash -= 1;
    }
    this.dash = clamp(this.dash, 0, Infinity);

    if(GetKeyState(Keys.right_arrow))
    {
      this.xv += 1;
      this.direction = 1;
    }
    if(GetKeyState(Keys.left_arrow))
    {
      this.xv -= 3;
      this.direction = -1;
    }
    this.xv /= this.friction;
    this.x += this.xv;
    this.y += this.yv;
    this.yv += this.Gravity;

    if(this.y + this.bbh + render.render.lineWidth > this.floorHeight)
    {
      this.y = this.floorHeight - this.bbh - render.render.lineWidth;
      this.yv = 0;
    }
    this.Collision(render, group);
  }
  Collision(render, group)
  {
    for(var i in group.elevators)
    {
      if(this.x - render.render.lineWidth < group.elevators[i].x + group.elevators[i].bbw)
      {
        if(this.x + this.bbw + render.render.lineWidth > group.elevators[i].x)
        {
          if(this.y - render.render.lineWidth < group.elevators[i].y + group.elevators[i].bbh)
          {
            if(this.y + this.bbh + render.render.lineWidth > group.elevators[i].y)
            {
              document.dispatchEvent(this.event);
              this.dash = 0;
              this.x = this.respawn.x;
              this.xv = 0;
              this.y = this.respawn.y - this.bbh - render.render.lineWidth;
              this.yv = 0;
            }
          }
        }
      }
    }
  }
}
class Elevator
{
  constructor(x, y, w, h, bbw, bbh)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bbw = bbw;
    this.bbh = bbh;

    this.topHeight = -300;
    this.direction = 1;
    this.speed = RandomInt(5, 20);
    this.wait = false;
    this.bottomDelay = RandomInt(5, 100);
    this.topDelay = RandomInt(5, 100);
    this.delay = 0;
  }
  Draw(render, cam, floorHeight)
  {
    render.render.lineCap = "butt";
    render.SetLineWidth(10);
    render.SetStroke(55, 55, 55, 1);
    render.DrawLine(this.x + 20 - cam.x, this.y + this.h - cam.y, this.x + 20 - cam.x, floorHeight - render.render.lineWidth/2 - cam.y);
    render.DrawLine(this.x + 20 - cam.x, this.y - cam.y, this.x + 20 - cam.x, this.topHeight + render.render.lineWidth * 2 - cam.y);
    render.DrawLine(this.x + this.w - 20 - cam.x, this.y + this.h - cam.y, this.x + this.w - 20 - cam.x, floorHeight - render.render.lineWidth/2 - cam.y);
    render.DrawLine(this.x + this.w - 20 - cam.x, this.y - cam.y, this.x + this.w - 20 - cam.x, this.topHeight + render.render.lineWidth*2 - cam.y);
    render.SetStroke(255, 255, 255, 1);
    render.render.lineCap = "round";
    render.DrawRect(this.x - cam.x, this.y - cam.y, this.x + this.w - cam.x, this.y + this.h - cam.y);
  }
  Update(render, cam, game, player)
  {
    if(!this.wait)
    {
      var speed = (this.direction > 0)? this.speed : this.speed / 1.5;
      this.y += this.direction * speed;
      if(this.y + this.bbh + render.render.lineWidth > player.floorHeight)
      {
        this.y = player.floorHeight - this.bbh - render.render.lineWidth;
        this.direction *= -1;
        this.wait = true;
      }
      else if(this.y - render.render.lineWidth < this.topHeight) {
        this.y = this.y + render.render.lineWidth;
        this.direction *= -1;
        this.wait = true;
      }
    }
    else {
      if(this.direction > 0)
      {
        if(this.delay < this.topDelay)
        {
          this.delay += 60 * game.SafeDeltaTime;
        }
        else {
          this.delay = 0;
          this.wait = false;
        }
      }
      else {
        if(this.delay < this.bottomDelay)
        {
          this.delay += 60 * game.SafeDeltaTime;
        }
        else {
          this.delay = 0;
          this.wait = false;
        }
      }
    }
  }
}
class Coin
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;

    this.w = 10;
    this.direction = 1;
    this.max = 30;
    this.draw = true;
    //this.timer = 0;
  }
  respawn(e)
  {
    this.draw = true;
  }
  UpdateAndDraw(render, cam, player)
  {
    this.w += this.direction / clamp(((Math.abs(this.w) + 1) / (this.max / 2)), 1, Infinity);
    if(this.w > this.max)
    {
      this.w = this.max;
      this.direction *= -1;
    }
    if(this.w < -this.max)
    {
      this.w = -this.max;
      this.direction *= -1;
    }
    //this.w = (Math.sin((this.timer / 180 * Math.PI)) * this.max / 2) + this.max / 2;
    //this.timer += 4;
    if(this.draw)
    {
      render.SetStroke(255, 205, 0, 1);
      render.SetFill(255, 255, 0, 1);
      render.DrawFillEllipse(this.x - cam.x, this.y - cam.y, Math.abs(this.w), this.max);
    }

    if(this.x - Math.abs(this.w)  - render.render.lineWidth < player.x + player.bbw)
    {
      if(this.x + Math.abs(this.w) + render.render.lineWidth > player.x)
      {
        if(this.y - this.max  - render.render.lineWidth < player.y + player.bbh)
        {
          if(this.y + this.max + render.render.lineWidth > player.y)
          {
            var prev = this.draw;
            this.draw = false;
            if(prev)
            {
              return true;
            }
          }
        }
      }
    }
  }
}
class Group
{
  constructor()
  {
    this.elevators = [];
    this.coins = [];
    this.coinsPickedUp = 0;
  }
  Add(x, y, w, h, bbw, bbh)
  {
    this.elevators.push(new Elevator(x, y, w, h, bbw, bbh));
  }
  AddCoin(x, y)
  {
    this.coins.push(new Coin(x, y));
  }
  Draw(render, cam, floorHeight, player)
  {
    for(var i in this.elevators)
    {
        this.elevators[i].Draw(render, cam, floorHeight);
    }
    for(var i in this.coins)
    {
      if(this.coins[i].UpdateAndDraw(render, cam, player))
      {
        this.coinsPickedUp += 1;
      }
    }
  }
  Update(render, cam, game, player)
  {
    for(var i in this.elevators)
    {
      if(this.elevators[i].x < (player.x + render.Width * 2) && this.elevators[i].x > -(player.x + render.Width * 2))
        this.elevators[i].Update(render, cam, game, player);
    }
  }
}
class Firework {
  constructor(x, y, xv, yv, size, maxTicks) {
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;

    this.size = size;

    this.maxTicks = maxTicks;
    this.ticks = 0;
    this.update = true;

    this.particles = [];
    this.color = {
      r: RandomInt(55, 255),
      g: RandomInt(55, 255),
      b: RandomInt(55, 255),
      a: 1
    }
  }
  FillArray()
  {
    for(var i = 0; i < RandomInt(5, 55); i++)
    {
      this.particles.push(new FireworkParticle(this.x, this.y, RandomFloat(-15, 15), RandomFloat(-15, 15), RandomFloat(2, 6)));
    }
  }
  Draw(render, cam) {
    if(this.update) {
      render.SetFill(this.color.r, this.color.g, this.color.b, this.color.a);
      render.SetStroke(this.color.r, this.color.g, this.color.b, this.color.a);
      render.DrawFillCircle(this.x - cam.x, this.y - cam.y, this.size);
    }
    else {
      for(var i in this.particles)
      {
        this.particles[i].Draw(renderer, cam);
      }
    }
  }
  Update(game) {
    if(this.ticks > this.maxTicks) {
      if(this.particles.length == 0)
      {
        this.FillArray();
      }
      for(var i = this.particles.length - 1; i >= 0; i--)
      {
        if(this.particles[i].Update(game))
        {
          this.particles.splice(i, 1);
          if(this.particles.length == 0) {/* return true; Z*/}
        }
      }
      this.update = false;
    }
    if(this.update)
    {
      this.ticks += 60 * game.SafeDeltaTime;
      this.x += (this.xv / 100) * 60 * game.SafeDeltaTime;
      this.y += this.yv * 60 * game.SafeDeltaTime;

      if(!(this.xv == 0)) {
        this.xv += (this.xv > 0)? 1 : -1;
      }
      this.yv += 0.2;
    }
  }
}
class FireworkParticle {
  constructor(x, y, xv, yv, size) {
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;

    this.size = size;

    this.color = {
      r: RandomInt(55, 255),
      g: RandomInt(55, 255),
      b: RandomInt(55, 255),
      a: 1
    }
  }
  Draw(render, cam) {
    render.SetFill(255, 255, 255, 0.1);
    render.SetStroke(255, 255, 255, 0.1);
    render.DrawFillCircleNoStroke(this.x - cam.x, this.y - cam.y, this.size * 4);
    render.SetFill(this.color.r, this.color.g, this.color.b, this.color.a);
    render.SetStroke(this.color.r, this.color.g, this.color.b, this.color.a);
    render.DrawFillCircle(this.x - cam.x, this.y - cam.y, this.size);
  }
  Update(game) {
    if(Math.round(this.xv) == 0 && Math.round(this.yv) == 0){ return true; }
    this.x += this.xv * 60 * game.SafeDeltaTime;
    this.y += this.yv * 60 * game.SafeDeltaTime;

    this.xv /= 1.05;
    this.yv /= 1.05;
  }
}
// Keyboard stuff
var Keys = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pause_break: 19,
  caps_lock: 20,
  escape: 27,
  space: 32,
  page_up: 33,
  page_down: 34,
  end: 35,
  home: 36,
  left_arrow: 37,
  up_arrow: 38,
  right_arrow: 39,
  down_arrow: 40,
  insert: 45,
  delete: 46,
  zero: 48,
  one: 49,
  two: 50,
  three: 51,
  four: 52,
  five: 53,
  six: 54,
  seven: 55,
  eight: 56,
  nine: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  left_window_key: 91,
  right_window_key: 92,
  select_key: 93,
  numpad_zero: 96,
  numpad_one: 97,
  numpad_two: 98,
  numpad_three: 99,
  numpad_four: 100,
  numpad_five: 101,
  numpad_six: 102,
  numpad_seven: 103,
  numpad_eight: 104,
  numpad_nine: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimal_point: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  num_lock: 144,
  scroll_lock: 145,
  semi_colon: 186,
  equal_sign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forward_slash: 191,
  grave_accent: 192,
  open_bracket: 219,
  back_slash: 220,
  close_braket: 221,
  single_quote: 222,
}
var Keys_state = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
function GetKeyState(key) {
  return Keys_state[((key - 8) * 2) + 1];
}
var Keyboard = {
  event: function(e) {
    var key_state = (e.type === "keydown")? true : false;
    Keys_state[((e.keyCode - 8)*2)+1] = key_state;
  }
}
document.addEventListener("keydown", Keyboard.event);
document.addEventListener("keyup", Keyboard.event);
