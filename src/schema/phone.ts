import { z } from "zod";


const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const phoneSchema = z.string().regex(phoneRegex, "Invalid phone number format");

export { phoneSchema };