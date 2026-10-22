import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { ListComponent } from "../list/list.component";
import { CvCardComponent } from "../cv-card/cv-card.component";
import { EmbaucheComponent } from "../embauche/embauche.component";
import { UpperCasePipe, DatePipe } from "@angular/common";

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
  imports: [ListComponent, CvCardComponent, EmbaucheComponent, UpperCasePipe, DatePipe],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  date = new Date();

  /** Le cv sélectionné vient du service (signal en lecture seule) */
  selectedCv = this.cvService.selectedCv;

  /** La liste des cvs : l'Observable HTTP est converti en signal */
  cvs = toSignal(
    this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      })
    ),
    { initialValue: [] as Cv[] }
  );

  constructor() {
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }
}
