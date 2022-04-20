import { Injectable } from "@angular/core";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Auth } from "@angular/fire/auth";

@Injectable()
export class Email implements AsyncValidator {
    constructor(private auth: Auth) {
    }

    validate(control: AbstractControl) : Promise<ValidationErrors | null> {
        return fetchSignInMethodsForEmail(this.auth, control.value).then(response => response.length ? { email: true } : null)
    }
}
