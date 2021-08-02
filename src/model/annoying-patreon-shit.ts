export class PatreonStatusDto {
  patreonId: string;
  status: string;
  pledgeAmount: number;
}

export class RelationShip {
  data: RelationData;
  included: IncludedData[];
}

export class RelationData {
  id: string;
  type: string;
  relationships: {
    memberships: MemberRelationshipRelationData;
  };
}

export class MemberRelationshipRelationData {
  data: {
    id: string;
    type: string;
  }[];
}

export class IncludedData {
  id: string;
  type: string;
  attributes: {
    patron_status: string;
    will_pay_amount_cents: number;
  };
}
