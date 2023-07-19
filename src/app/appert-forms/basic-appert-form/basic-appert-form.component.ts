import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-basic-appert-form',
  templateUrl: './basic-appert-form.component.html',
  styleUrls: ['./basic-appert-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class BasicAppertFormComponent implements OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  formGroup = this.fb.group({
    weight: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
      updateOn: 'change',
    }),
    bottleNbr: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
      updateOn: 'change',
    }),
  });

  totalMilk$ = this.formGroup.controls.weight.valueChanges.pipe(
    takeUntil(this._destroy$),
    map((weight) => {
      if (weight) {
        return parseInt((weight / 10 + 250).toFixed(0));
      }
      return 0;
    })
  );

  totalByBottle$ = combineLatest([
    this.totalMilk$,
    this.formGroup.controls.bottleNbr.valueChanges,
  ]).pipe(
    takeUntil(this._destroy$),
    map(([totalMilk, bottleNbr]) => {
      if (totalMilk && bottleNbr) {
        return parseInt((totalMilk / bottleNbr).toFixed(0));
      }
      return 0;
    })
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
