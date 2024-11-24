// import HeroSection from '@/components/pages/home/HeroSection'
import CategoriesMenu from '@/components/pages/market/CategoriesMenu'
import SmartDeals from '@/components/pages/market/SmartDeals'
import TopCategories from '@/components/pages/market/TopCategories'
import TopDeals from '@/components/pages/market/TopDeals'

export default function Page() {
  return (
    <section>
        {/* <HeroSection /> */}
        <CategoriesMenu />
        <SmartDeals />
        <TopDeals />
        <TopCategories />

    </section>
  )
}