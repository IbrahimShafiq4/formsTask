import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { Project } from './interface/project';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  signupForm!: FormGroup;
  fb = inject(FormBuilder);
  forbiddenProjectName: string = 'Test';

  project: Project = {
    projectName: '',
    projectEmail: '',
    projectStatus: '',
  }

  submitted: boolean = false;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      projectName: [null, [Validators.required, Validators.minLength(3), this.forbiddenName.bind(this)]],
      email: [null, [Validators.required, Validators.email], this.forbiddenEmail],
      projectStatus: ['stable', Validators.required]
    });
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        control.value === 'test@gmail.com' ? resolve({ emailIsForbidden: true }) : resolve(null)
      }, 2000)
    })

    return promise;
  }

  forbiddenName(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && this.forbiddenProjectName.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
      return { forbiddenProjName: true }
    }
    return null
  }

  onSubmit(): void {

    this.submitted = true;

    this.project.projectName = this.signupForm.get('projectName')?.value;
    this.project.projectEmail = this.signupForm.get('email')?.value;
    this.project.projectStatus = this.signupForm.get('projectStatus')?.value;
  }
}
