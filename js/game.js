var canvasDiv = CreateBaseDiv("AllCanvs");
var canvasID = CreateElement("canvas", "mainCanvas", canvasDiv);
var game = new Game();
var renderer = new Renderer(canvasID, 1280, 720);
renderer.FullScreen();
var cam = new Camera(0, 0, renderer);
let event = new Event("PlayerDie");
var player = new Player(-400, renderer.Height, 40, 60, 40, 60, event, renderer.Height);
var elevators = new Group();
var fireworks = [];

const length = 100;
var won = false;

var mouseX = 0;
var mouseY = 0;

for(var i = 0; i < length; i++)
{
  if((i % 10) != 9)
  {
    elevators.Add(250 * i, RandomInt(-300, renderer.Height - 270), 200, 250, 200, 250);
  }
  else {
    elevators.AddCoin(250 * i + 100, 900);
  }
}

game.StartUpdateFunction(Update);

function Update(timeStamp)
{
  if(elevators.coinsPickedUp == (length / 10))
    won = true;
  if(game.ticks % 2 == 0 && won)
  {
    fireworks.push(new FireworkParticle(player.x + player.w / 2, player.y, RandomFloat(-7, 7), RandomFloat(-10, -25), 7));
  }
  if(player.x + renderer.Width * 2 > (length * 255) && game.ticks % 2 == 0 && elevators.coinsPickedUp == (length / 10))
  {
    fireworks.push(new FireworkParticle(((length - 1) * 255), player.floorHeight, RandomFloat(-10, 10), RandomFloat(-10, -35), 7));
    fireworks.push(new FireworkParticle(((length + 1) * 255), player.floorHeight, RandomFloat(-10, 10), RandomFloat(-10, -35), 7));
  }
  renderer.ResetColor();
  renderer.SetFill(0, 0, 0, 1)
  game.Update(timeStamp);
  cam.MoveTo_Soft(player.x + (mouseX - renderer.Width / 2), player.y + (mouseY - renderer.Height), renderer, game);
  cam.x = clamp(cam.x, -400 - renderer.Width / 4, (length * 255) - renderer.Width / 1.5);
  renderer.FullScreen();
  renderer.FillScreen();
  player.Update(renderer, cam, game, elevators);
  for(var i = fireworks.length - 1; i >= 0; i--)
  {
    if(fireworks[i].Update(game))
    {
      fireworks.splice(i, 1);
    }
  }
  elevators.Update(renderer, cam, game, player);
  elevators.Draw(renderer, cam, player.floorHeight, player);
  player.Draw(renderer, cam);
  for(var i in fireworks)
  {
    fireworks[i].Draw(renderer, cam);
  }
  renderer.DrawBar(300, 50, -250, 250, (elevators.coinsPickedUp / (length / 10)) * 500, 50, {r: 255, g: 243, b: 69});
  renderer.DrawBar(300, 110, -250, 250, ((player.x + 200) / (length * 255)) * 500, 50, {r:251, g:110, b:255});
  renderer.DrawBar(300, 170, -250, 250, ((player.dash % (player.dashSec + 0.00001)) / player.dashSec) * 500, 50, {r: 85, g: 255, b: 254});
  renderer.DrawBar(300, 230, -250, 250, (player.dash / player.maxDash) * 500, 50, {r: 85, g: 200, b: 254});
  game.RecallUpdate();
}

document.addEventListener("PlayerDie", function(){
  for(var i in elevators.coins)
    elevators.coins[i].respawn();
    elevators.coinsPickedUp = 0;
});
document.addEventListener("mousemove", function(e)
{
  mouseX = e.x;
  mouseY = e.y;
});
