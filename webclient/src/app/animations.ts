import { trigger, transition, query, style, animate, group, animation } from '@angular/animations';

export const scaleIn = animation([
  style({ opacity: 0, transform: 'scale(0.5)' }), // start state
  animate('{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)', style({ opacity: 1, transform: 'scale(1)' })),
]);

export const scaleOut = animation([animate('{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)', style({ opacity: 0, transform: 'scale(0.5)' }))]);

export const slideAnimation = trigger('routeAnimations', [
  transition('* => isRight', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
    ]),
  ]),

  transition('isRight => *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
    ]),
  ]),

  transition('* => isLeft', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
    ]),
  ]),

  transition('isLeft => *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    /* 2 */ group([
      // block executes in parallel
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.4s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
    ]),
  ]),
]);
