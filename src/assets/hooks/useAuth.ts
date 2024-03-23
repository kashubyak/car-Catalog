import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvides";

export const useAuth = () => useContext(AuthContext);