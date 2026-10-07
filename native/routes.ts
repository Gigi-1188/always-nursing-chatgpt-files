import * as r0 from "../app/api/application/route.ts";
import * as r1 from "../app/api/demo-access/route.ts";
import * as r2 from "../app/api/demo-links/route.ts";
import * as r3 from "../app/api/documents/[id]/route.ts";
import * as r4 from "../app/api/documents/route.ts";
import * as r5 from "../app/api/employment/route.ts";
import * as r6 from "../app/api/facility-contract/pdf/route.ts";
import * as r7 from "../app/api/facility-contract/route.ts";
import * as r8 from "../app/api/facility-feedback/route.ts";
import * as r9 from "../app/api/facility-images/[id]/route.ts";
import * as r10 from "../app/api/facility-images/route.ts";
import * as r11 from "../app/api/facility-inquiries/route.ts";
import * as r12 from "../app/api/home/route.ts";
import * as r13 from "../app/api/home-media/[id]/route.ts";
import * as r14 from "../app/api/home-media/route.ts";
import * as r15 from "../app/api/incentives/route.ts";
import * as r16 from "../app/api/merch/route.ts";
import * as r17 from "../app/api/merch/shop/route.ts";
import * as r18 from "../app/api/no-call-no-show/route.ts";
import * as r19 from "../app/api/office/applications/route.ts";
import * as r20 from "../app/api/office/employee/route.ts";
import * as r21 from "../app/api/quarterly-contest/route.ts";
import * as r22 from "../app/api/referrals/route.ts";
import * as r23 from "../app/api/shift-preview/route.ts";
import * as r24 from "../app/api/theme/route.ts";
import * as r25 from "../app/api/training/media/[id]/route.ts";
import * as r26 from "../app/api/training/route.ts";
import * as r27 from "../app/api/workflows/route.ts";
export const routes = [
  {path:"/api/application",handlers:r0},
  {path:"/api/demo-access",handlers:r1},
  {path:"/api/demo-links",handlers:r2},
  {path:"/api/documents/[id]",handlers:r3},
  {path:"/api/documents",handlers:r4},
  {path:"/api/employment",handlers:r5},
  {path:"/api/facility-contract/pdf",handlers:r6},
  {path:"/api/facility-contract",handlers:r7},
  {path:"/api/facility-feedback",handlers:r8},
  {path:"/api/facility-images/[id]",handlers:r9},
  {path:"/api/facility-images",handlers:r10},
  {path:"/api/facility-inquiries",handlers:r11},
  {path:"/api/home",handlers:r12},
  {path:"/api/home-media/[id]",handlers:r13},
  {path:"/api/home-media",handlers:r14},
  {path:"/api/incentives",handlers:r15},
  {path:"/api/merch",handlers:r16},
  {path:"/api/merch/shop",handlers:r17},
  {path:"/api/no-call-no-show",handlers:r18},
  {path:"/api/office/applications",handlers:r19},
  {path:"/api/office/employee",handlers:r20},
  {path:"/api/quarterly-contest",handlers:r21},
  {path:"/api/referrals",handlers:r22},
  {path:"/api/shift-preview",handlers:r23},
  {path:"/api/theme",handlers:r24},
  {path:"/api/training/media/[id]",handlers:r25},
  {path:"/api/training",handlers:r26},
  {path:"/api/workflows",handlers:r27},
];
