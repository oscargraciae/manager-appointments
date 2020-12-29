export interface IBusiness {
  id?: number
  name: string
  description?: string
  cover?: string 
  phone?: string
  isActive?: boolean
  isCompleted?: boolean
}

// export interface IBusinessGet {
//   id: number
//   name: string
//   description?: string
//   cover?: string 
//   phone?: string
//   isActive?: boolean
//   isCompleted?: boolean
// }


export interface IBusinessResponse {
  business?: IBusiness
  success: boolean
  message?: string
}