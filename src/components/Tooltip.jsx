export function TooltipLives() {
  return (
    <div className=" bg-white text-black font-semibold  absolute  translate-x-8 rounded-md px-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 duration-200 z-50">
      Canales en vivo
    </div>
  );
}
export function TooltipColapsar() {
  return (
    <div className="absolute translate-x-7  bg-white text-black font-semibold rounded-md px-3 py-1 shadow-md opacity-0 invisible hover:opacity-100  group-hover:visible group-hover:opacity-100 duration-200  z-50">
      <p>Colapsar</p>
    </div>
  );
}

export function TooltipExpandir() {
  return (
    <div className="absolute right-1  bg-white text-black font-semibold rounded-md px-3  py-1 shadow-md  opacity-0 invisible group-hover:visible group-hover:opacity-100 z-50 duration-200">
      <p className=" rotate-180">Expadir</p>
    </div>
  );
}
export function TooltipLogout() {
  return (
    <div className="absolute right-3  bg-white text-black font-semibold rounded-md px-3 top-20  py-1 shadow-md opacity-0 invisible group-hover:visible group-hover:opacity-100 z-50 duration-200">
      <p className=" font-semibold text-xs">Log out</p>
    </div>
  );
}
