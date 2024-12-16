import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: [""],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}")],
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
        },
      ],
      
    },
    {
      validators: ageCinValidator(),
    }
  );

  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}

export function ageCinValidator(): ValidationErrors | null {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const age = formGroup.get('age')?.value; // Récupère l'âge
    const cin = formGroup.get('cin')?.value; // Récupère le CIN

    if (!cin || !age) {
      return null; // Pas d'erreur si l'un des champs est vide
    }

    // Extrait les deux premiers caractères
    const firstTwoDigits = parseInt(cin.substring(0, 2), 10);

    // Valide selon les règles données
    if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
      return { cinInvalidForAge: true }; // Erreur si l'âge >= 60 mais CIN invalide
    } else if (age < 60 && firstTwoDigits <= 19) {
      return { cinInvalidForAge: true }; // Erreur si l'âge < 60 mais CIN invalide
    }

    return null; // Pas d'erreur
  };
}