import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basic-appert-form-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basic-appert-form-result.component.html',
  styleUrls: ['./basic-appert-form-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAppertFormResultComponent {
  @Input()
  resultType!: string;

  @Input()
  note!: string;

  @Input()
  totalMilk$!: Observable<number>;

  @Input()
  totalByBottle$!: Observable<number>;

  @Input()
  bottleNbr!: number | null;
}
