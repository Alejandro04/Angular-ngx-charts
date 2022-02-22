import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "../../services/project.service";
import { take } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
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
      'nombre',
      'icono',
      'directorio',
      'codigo',
      'comando',
      'key_parent',
      'mostrar_en_menu',
      'auxiliar_contable',
      'orden',
      'proceso',
      'abre_proceso',
      'star'
    ];
  
  public pageSize: number = 20;
  public maxPage: number = 20;
  public page: number = 1;

  constructor(
    private service: ProjectService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.configForm();
    this.getMenu();
    const action = this.service.getAction();
    action.subscribe((action:any) => this.executeAction(action));
  }

  configForm() {
    this.registerForm = this.formBuilder.group({
      user_id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      icono: ["", [Validators.required]],
      directorio: ["", [Validators.required]],
      codigo: ["", [Validators.required]],
      comando: ["", [Validators.required]],
      key_parent: ["", [Validators.required]],
      mostrar_en_menu: ["", [Validators.required]],
      auxiliar_contable: ["", [Validators.required]],
      orden: ["", [Validators.required]],
      proceso: ["", [Validators.required]],
      abre_proceso: ["", [Validators.required]]
    });

    this.updateForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      user_id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      icono: ["", [Validators.required]],
      directorio: ["", [Validators.required]],
      codigo: ["", [Validators.required]],
      comando: ["", [Validators.required]],
      key_parent: ["", [Validators.required]],
      mostrar_en_menu: ["", [Validators.required]],
      auxiliar_contable: ["", [Validators.required]],
      orden: ["", [Validators.required]],
      proceso: ["", [Validators.required]],
      abre_proceso: ["", [Validators.required]]
    });
  }

  public getMenu() {
    this.dataInactive = true;
    this.service.getProjects().pipe(take(1)).subscribe((data) => {
      this.addDataToTable(data.menu)
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

  /** Angular Material Table Functions. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource && this.dataSource.data ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    // clean individual selected
    this.selection.clear();

    // clean all selected
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select());
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.claim_id + 1}`;
  }

  selectRecord($event: any, row: any, flag: any) {
    $event.stopPropagation();
  }

  /* Create project modal  */
  public createProject(contentCreate: any) {
    this.modalService.open(contentCreate).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
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
            id: data.menu.id,
            nombre: data.menu.nombre,
            icono: data.menu.icono,
            directorio: data.menu.directorio,
            codigo: data.menu.codigo,
            comando: data.menu.comando,
            key_parent: data.menu.key_parent,
            mostrar_en_menu: data.menu.mostrar_en_menu,
            auxiliar_contable: data.menu.auxiliar_contable,
            orden: data.menu.orden,
            proceso: data.menu.proceso,
            abre_proceso: data.menu.abre_proceso
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
    this.updateForm.patchValue({ nombre: this.record.nombre });
    this.updateForm.patchValue({ icono: this.record.icono });
    this.updateForm.patchValue({ directorio: this.record.directorio });
    this.updateForm.patchValue({ codigo: this.record.codigo });
    this.updateForm.patchValue({ comando: this.record.comando });
    this.updateForm.patchValue({ key_parent: this.record.key_parent });
    this.updateForm.patchValue({ mostrar_en_menu: this.record.mostrar_en_menu });
    this.updateForm.patchValue({ auxiliar_contable: this.record.auxiliar_contable });
    this.updateForm.patchValue({ orden: this.record.orden });
    this.updateForm.patchValue({ proceso: this.record.proceso });
    this.updateForm.patchValue({ abre_proceso: this.record.abre_proceso });

    this.modalService.open(this.contentUpdate).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /* Delete project modal  */
  public deleteProject() {
    this.modalService.open(this.contentDelete).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
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