import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/axios";


// export const DeleteTodo = createAsyncThunk(
//     'todo/DeleteTodo',
//     async (params: any, { getState }: any) => {
//       console.log(params);
  
//       const response = await api.get('/')
//       return { response, params };
//     }
//   );