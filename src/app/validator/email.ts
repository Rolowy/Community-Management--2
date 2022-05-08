import { Injectable } from "@angular/core";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable()
export class Email implements AsyncValidator {
    constructor() {
    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> {
        const auth = getAuth();
        return fetchSignInMethodsForEmail(auth, control.value).then(response => response.length ? { email: true } : null)
    }
}
