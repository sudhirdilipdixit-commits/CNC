'use client'

import { useMemo, useState } from 'react'
import type { ProgramItem } from '@/components/online-mba/specializationData'

const SORTS = [
  { key: 'balanced', label: 'Balanced pick' },
  { key: 'fee-low', label: 'Lowest fee first' },
  { key: 'fee-high', label: 'Highest fee first' },
  { key: 'approval', label: 'Strongest accreditation' },
] as const

type SortKey = (typeof SORTS)[number]['key']

function parseFee(fee: string): number {
  const match = fee.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

function approvalScore(approval: string): number {
  return approval.split(',').length
}

function initials(uni: string): string {
  return uni
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function ProgrammeCompareCards({
  programmes,
  onEnquire,
}: {
  programmes: ProgramItem[]
  onEnquire: (rank: number) => void
}) {
  const [sort, setSort] = useState<SortKey>('balanced')

  const sorted = useMemo(() => {
    const list = [...programmes]
    if (sort === 'fee-low') list.sort((a, b) => parseFee(a.fee) - parseFee(b.fee))
    else if (sort === 'fee-high') list.sort((a, b) => parseFee(b.fee) - parseFee(a.fee))
    else if (sort === 'approval') list.sort((a, b) => approvalScore(b.approval) - approvalScore(a.approval))
    else list.sort((a, b) => a.rank - b.rank)
    return list
  }, [programmes, sort])

  return (
    <div className="compare-cards-wrap">
      <div className="compare-sort-chips" role="group" aria-label="Sort programmes by">
        {SORTS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`compare-chip${sort === s.key ? ' active' : ''}`}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="compare-card-grid">
        {sorted.map((item) => (
          <div className="compare-card" key={item.rank}>
            <div className="compare-card-top">
              <div className="compare-card-logo" aria-hidden="true">{initials(item.uni)}</div>
              <div className="compare-card-fee">{item.fee}</div>
            </div>
            <div className="compare-card-name">{item.uni}</div>
            <div className="compare-card-tags">
              <span className="compare-card-tag">{item.duration}</span>
              <span className="compare-card-tag">{item.batch}</span>
              <span className="compare-card-tag compare-card-tag-approval">{item.approval}</span>
            </div>
            <p className="compare-card-why">{item.strength}</p>
            <button type="button" className="btn btn-primary compare-card-cta" onClick={() => onEnquire(item.rank)}>
              Enquire
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
