import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Must enter a password." })
});


export const createAccountSchema = z.object({
    completeName: z.string().min(5, { message: "Must enter proper complete name." }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Choose a strong password." }),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {

    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Password must equal to Confirm Password",
            path: ["password"]
        });

        ctx.addIssue({
            code: "custom",
            message: "Confirm password must equal to Password.",
            path: ["confirmPassword"]
        })
    }

});


export const insertSchema = z.record(z.string().min(1, { message: "This field must not be empty." }));

export const balancePaySchema = z.object({
    balanceAmount: z.string().min(1, { message: "Must not be empty" })
});

export const clientUpdateAccountSchema = z.object({
    newPass: z.string().min(6, { message: "Must choose a strong password." }),
    confirmNewPass: z.string()
}).superRefine(({ newPass, confirmNewPass }, ctx) => {
    if (confirmNewPass !== newPass) {
        ctx.addIssue({
            code: "custom",
            message: "New Password must equal to Confirm New Password",
            path: ["newPass"],
        });


    }
})