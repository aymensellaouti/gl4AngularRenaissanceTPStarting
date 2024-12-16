import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { ActivatedRoute } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs: Cv[] = []; // Stocker les CVs résolus
  selectedCv$: Observable <Cv | null>;
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private activatedRoute: ActivatedRoute

  ) {
    // Récupérer les données résolues depuis le Router
    this.cvs = this.activatedRoute.snapshot.data['cvs'] || [];

    // Observable pour le CV sélectionné
    this.selectedCv$ = of(null);

    // Logs et notifications
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }
}
