import { UserModel } from "../models/users";

export const saveToLocalStorageList = (users: UserModel[]): void => {
    localStorage.setItem('toDoListUsers', JSON.stringify(users));
}

export const GetFromLocalStorageList = () : UserModel[] => {
    let users = <UserModel[]>JSON.parse(localStorage.getItem('toDoListUsers')) || [];
    return users;
}

export const GetFromLocalStorageCurrentUser = () : UserModel => {
    let users = <UserModel>JSON.parse(localStorage.getItem('currentUser'));
    return users;
}

export const getFromLocalStorageCurrent = () : UserModel => {
    let users = <UserModel[]>JSON.parse(localStorage.getItem('toDoListUsers')) || [];
    let user = GetFromLocalStorageCurrentUser();
   return users.find((x) => x.userName === user.userName && x.password === user.password)
}

//Agrego tareas al usuario
export const addTaskCurrentUser = (task: string) : void => {
    let taskUser = getFromLocalStorageCurrent()
    taskUser.tasks.push(task)
    const users = GetFromLocalStorageList();
    let updatedUsers = users.map(x => x.userName === taskUser.userName ? taskUser : x)
    saveToLocalStorageList(updatedUsers);
}

//Elimino tareas del usuario
export const removeTaskCurrentUser = (index: number) : void => {
    let taskUser = getFromLocalStorageCurrent()
    taskUser.tasks.splice(index, 1)
    const users = GetFromLocalStorageList();
    let updatedUsers = users.map(x => x.userName === taskUser.userName ? taskUser : x)
    saveToLocalStorageList(updatedUsers);
}

//Edito tareas del usuario
export const editTaskCurrentUser = (index: number, task: string) : void => {
    let taskUser = getFromLocalStorageCurrent()
    taskUser.tasks = taskUser.tasks.map((elem, idx) => {
                    return idx === index ? task : elem;
                })
    const users = GetFromLocalStorageList();
    let updatedUsers = users.map(x => x.userName === taskUser.userName ? taskUser : x)
    saveToLocalStorageList(updatedUsers);
}

export const login = (user: UserModel) : boolean => {
//   if(this.existUserInUsers(user)){
    const users = GetFromLocalStorageList();
    if(!!users.find((x) => x.userName === user.userName && x.password === user.password)){
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  
  export const registerUser = (user: UserModel) : boolean => {
    //1. Read from LS into local var
    const users = GetFromLocalStorageList();
    //Validation userName
    if(!!users.find((x) => x.userName === user.userName)){
      return false; 
    }
    //2. Add item to var local
    users.push(user);
    //3. Write to LS
    localStorage.setItem('toDoListUsers', JSON.stringify(users));
    return true;
  }
