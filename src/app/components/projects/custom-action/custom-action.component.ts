import { Component } from '@angular/core';
import { ProjectService } from "../../../services/project.service";

@Component({
  selector: 'custom-action-project-component',
  templateUrl: './custom-action.component.html',
  styleUrls: ['./custom-action.component.scss']
})
export class ProjectCustomActionComponent {
  public deleteComponentAction: boolean = true;

  constructor(private service: ProjectService) {}

  ngOnInit() {
  }

  executeAction(action:string) {
    this.service.executeAction(action);
  }
}
