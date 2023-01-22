export interface Car {
  name: string,
  color: string,
  id?:number
}

export interface Garage{
  name:string,
  color:string,
  id:number
}

export interface Obj {
  key:string,
  value:number,
  name?:string,
  color?:string,
  id?:number
}

export interface MoveCar{
  velocity: number,
  distance:number
}

export interface AnimObj{
  [id:number]:{ idAnim:number }
}

export interface CarWin {
  id:number,
  wins: number,
  time: number,
}

export interface UpdateWin {
  wins: number,
  time: number,
}
