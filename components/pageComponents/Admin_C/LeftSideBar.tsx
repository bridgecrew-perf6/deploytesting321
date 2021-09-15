import React from 'react'
import leftSideBarStyles from '../../../appStyles/adminStyles/leftSideBarStyles.module.css'
import { BsCaretRightFill, BsCaretDownFill, BsFolder, BsFileEarmark } from 'react-icons/bs'

const LeftSideBar = (props: any) => {
    const {
        leftSideCategory,
        subCategory,
        setLeftSideCategory,
        setLeftSideSubCategory
    } = props;


    const handleOpenMaster = (mc: any) => {
        let subId = "";
        let cats = false;
        const updatedMaster = leftSideCategory.map((lsc: any) => {
            if (lsc._id === mc._id) {
                if (!lsc.active) {
                    lsc.active = true;
                } else {
                    cats = true;
                    if (!lsc.haveCats) {
                        lsc.active = true;
                    } else {
                        lsc.active = false;
                    }
                }
                if (!lsc.haveCats) {
                    cats = false;
                    subId = "";
                }
            }
            return lsc;
        })
        let updatedSub;
        if (subId === "") {
            if (!cats) {
                updatedSub = subCategory.map((sc: any) => {
                    sc.active = false;
                    return sc;
                })
                setLeftSideSubCategory(updatedSub);
            }
        }
        setLeftSideCategory(updatedMaster);
    }

    const handleOpenSub = (mc: any, sub: any) => {
        if (mc.name === sub.categoryOf) {
            let updatedSub = subCategory.map((sc: any) => {
                if (sc._id === sub._id) {
                    if (!sc.active) {
                        sc.active = true;
                    }
                } else {
                    sc.active = false;
                }
                return sc;
            })
            leftSideCategory.map((lsc: any) => {
                if (!lsc.haveCats) {
                    lsc.active = false;
                }
            })
            setLeftSideSubCategory(updatedSub);
        }
    }

    return (
        <div className={leftSideBarStyles.sideBarWrapper}>
            <div className={leftSideBarStyles.buttonsWrapper}>
                {leftSideCategory.length && leftSideCategory.map((mc: any, mindex: any) => (
                    <React.Fragment key={mindex}>
                        <button onClick={() => handleOpenMaster(mc)} style={{ paddingLeft: mc?.haveCats ? "0" : "1.2rem" }} key={mindex}
                            className={
                                (mc?.active && mc?.selected) ? leftSideBarStyles.buttonsWrapper__masterButtonsSelected :
                                    mc?.active ? leftSideBarStyles.buttonsWrapper__masterButtonsActive :
                                        leftSideBarStyles.buttonsWrapper__masterButtons}
                        >
                            {mc?.haveCats ? mc?.active ? <BsCaretDownFill /> : <BsCaretRightFill /> : null}&nbsp;<BsFolder />&nbsp;{mc?.name}
                        </button>

                        {subCategory.map((sub: any, sindex: any) => (
                            sub.categoryOf === mc?.name ? (
                                <div key={sindex} onClick={() => handleOpenSub(mc, sub)} className={mc?.active ? leftSideBarStyles.buttonsWrapper__showSubCats : leftSideBarStyles.buttonsWrapper__isNotShowSubCats}>
                                    <button key={sindex} className={sub?.active ? leftSideBarStyles.buttonsWrapper__subButtonActive : leftSideBarStyles.buttonsWrapper__subButtons}>
                                        <BsFileEarmark />&nbsp;{sub?.name}
                                    </button>
                                </div>
                            ) : null
                        ))}
                    </React.Fragment>
                ))}
            </div>

        </div>
    )
}

export default LeftSideBar
