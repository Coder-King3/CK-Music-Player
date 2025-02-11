import KingTable from '@/components/King-Table/King-Table.jsx'

export default function single({ data }) {
  return (
    <>
      {/*歌曲*/}
      {
        <div className='content-section mt-10'>
          {/* <div className="content-section-title">Album</div> */}
          <KingTable data={data} style={{ maxHeight: '55vh' }} />
        </div>
      }
    </>
  )
}
