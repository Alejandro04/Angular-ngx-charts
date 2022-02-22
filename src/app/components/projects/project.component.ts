import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "../../services/project.service";
import { take } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthenticationService } from '../../services/auth.services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  public closeResult = '';
  public contentUpdate: string;
  public contentCreate: string;
  public contentDelete: string;
  public record: any;
  public submitted: boolean = false;
  public showAlertCreate: boolean = false;
  public showAlertErrorCreate: boolean = false;
  public showAlertUpdate: boolean = false;
  public showAlertErrorUpdate: boolean = false;
  public showAlertDelete: boolean = false;
  public showAlertErrorDelete: boolean = false;
  public errorMsg: string;
  public data: any[] = [];
  public dataDetail: any;
  public typeError: boolean = false;
  public messageError: string;
  public registerForm: FormGroup;
  public updateForm: FormGroup;
  public dataInactive: boolean = false;
  public dataSource: MatTableDataSource<any>;
  public paginator: MatPaginator;
  public selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public displayedColumns: string[] =
    [
      'select',
      'description',
      'star'
    ];
  
  public pageSize: number = 20;
  public maxPage: number = 20;
  public page: number = 1;
  public admin: boolean = false;

  constructor(
    private service: ProjectService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.authService.isAdmin) { this.admin = true }

    this.configForm();
    this.getProjects();
    const action = this.service.getAction();
    action.subscribe((action:any) => this.executeAction(action));
  }

  configForm() {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.updateForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  public getProjects() {
    this.dataInactive = true;
    this.service.getProjects().pipe(take(1)).subscribe((data) => {
      this.addDataToTable(data)
      this.dataInactive = false;
    });
  }

  public addDataToTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public executeAction(action: string) {
    if (action === 'delete') {
      this.deleteProject();
    }
    if (action === 'update') {
      this.updateProject();
    }
  }

  sendRecordToCustomAction(record: any, contentCreate: any, contentUpdate: any, contentDelete: any) {
    this.record = record;
    this.contentUpdate = contentUpdate;
    this.contentCreate = contentCreate;
    this.contentDelete = contentDelete;
  }

  /* Create project modal  */
  public createProject(contentCreate: any) {
    this.modalService.open(contentCreate).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public saveProject() {
    this.submitted = true;
    this.registerForm.patchValue({ user_id: localStorage.getItem('user_id') });
    if (this.registerForm.valid) {
      this.submitted = false;
      this.service.createProject(this.registerForm.value).pipe(take(1)).subscribe(
        (data: any) => {
          this.showAlertCreate = true;
          this.registerForm.reset();
          this.modalService.dismissAll();
          setTimeout(() => { this.showAlertCreate = false }, 3000);
          this.dataSource.data = [...this.dataSource.data, {
            id: data.id,
            name: data.name,
            description: data.description
          }];
        },
        (error: any) => {
          this.errorMsg = error.errors;
          this.showAlertErrorCreate = true;
        }
      );
    }
  }

   /* Update project modal  */
   public updateProject() {
    this.updateForm.patchValue({ id: this.record.id });
    this.updateForm.patchValue({ name: this.record.name });
    this.updateForm.patchValue({ description: this.record.description });

    this.modalService.open(this.contentUpdate).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /* Delete project modal  */
  public deleteProject() {
    this.modalService.open(this.contentDelete).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public updateDataProject() {
   //
  }

  public deleteDataProject() {
   //
  }
}