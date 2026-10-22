import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormBuilder, AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
  imports: [ReactiveFormsModule],
})
export class AutocompleteComponent {
  private formBuilder = inject(FormBuilder);
  private cvService = inject(CvService);

  form = this.formBuilder.group({ search: [""] });
  get search(): AbstractControl {
    return this.form.get("search")!;
  }

  cvs = toSignal(
    this.search.valueChanges.pipe(
      map((value) => (value ?? "").trim()),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((name) => this.cvService.selectByName(name))
    ),
    { initialValue: [] as Cv[] }
  );
}
