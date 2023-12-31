import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';
import { BasicAppertFormResultComponent } from './basic-appert-form-result/basic-appert-form-result.component';

@Component({
  selector: 'app-basic-appert-form',
  templateUrl: './basic-appert-form.component.html',
  styleUrls: ['./basic-appert-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BasicAppertFormResultComponent],
})
export class BasicAppertFormComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  private readonly _fb = inject(FormBuilder);

  formGroup = this._fb.group({
    weight: this._fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
      updateOn: 'change',
    }),
    bottleNbr: this._fb.control<number | null>(null, {
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
    }),
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
    }),
  );

  roundedTotalMilk$ = this.totalMilk$.pipe(
    takeUntil(this._destroy$),
    map(this.roundTotal),
  );

  roundedTotalByBottle$ = this.totalByBottle$.pipe(
    takeUntil(this._destroy$),
    map(this.roundTotal),
  );

  private roundTotal(total: number): number {
    let value = total;
    while (value % 30 !== 0) {
      value++;
    }
    return value;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
