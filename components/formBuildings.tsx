import React from 'react'
import FormPP from './FormPP';
import { fetchBulidingType, fetchSizes } from '@/lib/data-fetcher';

const FormBuild =async ({campID} : {campID: string}) => {

    const buildingtype = await fetchBulidingType();
    const sizes = await fetchSizes();
    return (
        <FormPP campID={campID} buildingtype={buildingtype} sizes={sizes} />
  )
}

export default FormBuild
