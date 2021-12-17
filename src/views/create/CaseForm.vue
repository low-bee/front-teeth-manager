<template>
  <el-form :model="submitCaseForm" :rules="rules" ref="submitCaseForm" label-width="100px" class="submitCaseForm">
    <el-form-item label="安氏分类" prop="angleClass">
      <el-checkbox-group v-model="submitCaseForm.angleClass">
        <el-checkbox label="1" name="angleClass1" border>安氏Ⅰ类</el-checkbox>
        <el-checkbox label="2" name="angleClass2" border>安氏Ⅱ类</el-checkbox>
        <el-checkbox label="3" name="angleClass3" border>安氏Ⅲ类</el-checkbox>
        <el-checkbox label="4" name="angleClass4" border>不确定</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="错𬌗类型" prop="malocclusionClass">
      <el-checkbox-group v-model="submitCaseForm.malocclusionClass">
        <el-checkbox label="1" name="toothBulge" :value="1" border>牙前突</el-checkbox>
        <el-checkbox label="2" name="crowd" :value="2" border>拥挤</el-checkbox>
        <el-checkbox label="3" name="toothGap" :valu="3" border>牙列间隙</el-checkbox>
        <el-checkbox label="4" name="deepOverburdenJaw" :value="4" border>深覆𬌗</el-checkbox>
        <el-checkbox label="5" name="frontToothAgainst" :value="5" border>前牙反𬌗</el-checkbox>
        <el-checkbox label="6" name="backToothAgainst" :value="6" border>后牙反𬌗</el-checkbox>
        <el-checkbox label="7" name="backToothLock" :value="7" border>后牙锁𬌗</el-checkbox>
        <el-checkbox label="8" name="openTooth" :value="8" border>开𬌗</el-checkbox>
        <el-checkbox label="9" name="upToothBulge" :value="9" border>上𬌗前突</el-checkbox>
        <el-checkbox label="10" name="upToothYoung" :value="10" border>上𬌗发育不足</el-checkbox>
        <el-checkbox label="11" name="upToothBulge" :value="11" border>下𬌗前突</el-checkbox>
        <el-checkbox label="12" name="upToothRetraction" :value="12" border>下𬌗后缩</el-checkbox>
        <el-checkbox label="13" name="smileNotOk" :value="13" border>笑线不调</el-checkbox>
        <el-checkbox label="0" name="other" :value="0" border>其他</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="主诉(必选)" prop="reportedSymptom">

      <el-checkbox-group v-model="submitCaseForm.reportedSymptom">
        <el-checkbox label="1" name="toothBulge" border>牙前突</el-checkbox>
        <el-checkbox label="2" name="toothIrregular" border>牙列不齐</el-checkbox>
        <el-checkbox label="3" name="toothGap" border>牙间隙</el-checkbox>
        <el-checkbox label="4" name="againstTooth" border>反𬌗</el-checkbox>
        <el-checkbox label="5" name="openTooth" border>开𬌗</el-checkbox>
        <el-checkbox label="6" name="backToothLock" border>后牙锁𬌗</el-checkbox>
        <el-checkbox label="0" name="other" border>其他</el-checkbox>
      </el-checkbox-group>
      <el-button @click="flags.reportedSymptomFlag = !flags.reportedSymptomFlag" type="text">备注</el-button>
      <el-input
          v-if="flags.reportedSymptomFlag"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="true"
          v-model="submitCaseForm.reportedText.reportedSymptomTextarea">
      </el-input>
    </el-form-item>

    <el-form-item label="矫治目标" prop="target">
      <el-checkbox-group v-model="submitCaseForm.treadTarget">
        <el-checkbox label="1" name="changeToothBulge" border>改善牙前突</el-checkbox>
        <el-checkbox label="2" name="regularTooth" border>排齐牙齿</el-checkbox>
        <el-checkbox label="3" name="closeToothGap" border>关闭牙隙</el-checkbox>
        <el-checkbox label="4" name="changeAgainstTooth" border>纠正反𬌗</el-checkbox>
        <el-checkbox label="5" name="changeOpenTooth" border>纠正开𬌗</el-checkbox>
        <el-checkbox label="6" name="changeLockTooth" border>纠正后牙锁𬌗</el-checkbox>
        <el-checkbox label="0" name="other" border>其他</el-checkbox>
      </el-checkbox-group>
      <el-button @click="flags.treadTargetFlag = !flags.treadTargetFlag" type="text">备注</el-button>
      <el-input
          v-if="flags.treadTargetFlag"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="true"
          v-model="submitCaseForm.reportedText.treadTargetTextarea">
      </el-input>
    </el-form-item>

    <el-form-item label="拟矫治牙颌" prop="supposeTarget">
      <el-checkbox-group v-model="submitCaseForm.supposeTarget">
        <el-checkbox label="1" name="allJaw" border>全颌</el-checkbox>
        <el-checkbox label="2" name="upJaw" border>上颌</el-checkbox>
        <el-checkbox label="3" name="downJaw" border>下颌</el-checkbox>
      </el-checkbox-group>
      <el-button @click="flags.supposeTargetFlag = !flags.supposeTargetFlag" type="text">备注</el-button>
      <el-input
          v-if="flags.supposeTargetFlag"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          :autosize="true"
          v-model="submitCaseForm.reportedText.supposeTargetTextarea">
      </el-input>
    </el-form-item>

    <el-form-item label="牙齿信息" prop="toothInfo">
      <el-radio-group v-model="submitCaseForm.toothInfo" @change="dealChange">
        <el-radio label="0" name="notDeficiency" border>无缺失</el-radio>
        <el-radio label="1" name="deficiency" border>缺失牙位</el-radio>
      </el-radio-group>
      <ToothAbstract :flag="toothFlag.toothInfoFlag" :array="submitCaseForm.toothInfoArray"></ToothAbstract>
    </el-form-item>

    <el-form-item label="不可移动牙齿" prop="dontMove">
      <el-radio-group v-model="submitCaseForm.dontMove" @change="dealDontChange">
        <el-radio label="0" name="nothing" border>无</el-radio>
        <el-radio label="1" name="dontMove" border>不可移动牙位</el-radio>
      </el-radio-group>
      <ToothAbstract :flag="toothFlag.dontMoveToothFlag" :array="submitCaseForm.dontMoveToothArray"></ToothAbstract>
    </el-form-item>

    <el-form-item label="不可设计附件" prop="dontAccessory">
      <el-radio-group v-model="submitCaseForm.dontAccessory" @change="dealAccessoryChange">
        <el-radio label="0" name="nothing" border>无</el-radio>
        <el-radio label="1" name="dontMove" border>不可设计附件牙齿</el-radio>
      </el-radio-group>
      <ToothAbstract :flag="toothFlag.dontAccessoryFlag" :array="submitCaseForm.dontAccessoryArray"></ToothAbstract>
    </el-form-item>

    <el-form-item label="面型" prop="faceType">
      <el-radio-group v-model="submitCaseForm.faceType" @change="dealFaceTypeChange">
        <el-radio label="0" name="keep" border>维持</el-radio>
        <el-radio label="1" name="change" border>改善</el-radio>
      </el-radio-group>
      <br/>
      <div v-if="toothFlag.faceTypeFlag">
        上颌&nbsp;&nbsp;
        <el-radio-group v-model="submitCaseForm.upFaceChangeType">
          <el-radio label="1" name="changeFront">改善前突</el-radio>
          <el-radio label="2" name="changeBack">改善后缩</el-radio>
          <el-radio label="0" name="keep">维持</el-radio>
        </el-radio-group>
        <br/>
        下颌&nbsp;&nbsp;
        <el-radio-group v-model="submitCaseForm.downFaceChangeType" >
          <el-radio label="1" name="changeFront">改善前突</el-radio>
          <el-radio label="2" name="changeBack">改善后缩</el-radio>
          <el-radio label="0" name="keep">维持</el-radio>
        </el-radio-group>
      </div>
    </el-form-item>

    <el-form-item label="矢状关系" prop="sagittalRelationship">
      <span>右&nbsp;&nbsp;</span>
      <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.SagittalRelationship.rightSagittalRelationship" @change="dealRightSagittalChange">
        <el-checkbox label="0" name="keep" border>维持</el-checkbox>
        <el-checkbox label="1" name="changeCanine" border>改善尖牙关系</el-checkbox>
        <el-checkbox label="2" name="changeMolar" border>改善磨牙关系</el-checkbox>
        <el-checkbox label="3" name="keep" border>3D设计之后再确定</el-checkbox>
      </el-checkbox-group>
      <div v-if="toothFlag.rightSagittalCanineFlag">
        <span class="tabSpan">改善尖牙关系方法&nbsp;&nbsp;</span>
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.SagittalRelationship.rightCanineRelationship">
          <el-checkbox label="0" name="interproximalEnamel" border>邻面去釉</el-checkbox>
          <el-checkbox label="1" name="traction2_3" border>II/III类牵引</el-checkbox>
          <el-checkbox label="2" name="distanceMolar" border>远移磨牙(需配合颌间牵引)</el-checkbox>
          <el-checkbox label="3" name="implantTraction" border>种植牵引</el-checkbox>
          <el-checkbox label="4" name="closeMolar" border>近移牵引</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="toothFlag.rightSagittalMolarFlag">
        <span class="tabSpan">改善磨牙关系方法&nbsp;&nbsp;</span>
        <el-checkbox-group class="inlineCheckBox"  v-model="submitCaseForm.SagittalRelationship.rightMolarRelationship" @change="dealMolarChange">
          <el-checkbox label="0" name="interproximalEnamel" border>邻面去釉</el-checkbox>
          <el-checkbox label="1" name="traction2_3" border>II/III类牵引</el-checkbox>
          <el-checkbox label="2" name="distanceMolar" border>远移磨牙(需配合颌间牵引)</el-checkbox>
          <el-checkbox label="3" name="implantTraction" border>种植牵引</el-checkbox>
          <el-checkbox label="4" name="closeMolar" border>近移牵引</el-checkbox>
        </el-checkbox-group>
      </div>
      <br v-if="!(toothFlag.rightSagittalCanineFlag || toothFlag.rightSagittalMolarFlag)"/>
      <span>左&nbsp;&nbsp;</span>
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.SagittalRelationship.leftSagittalRelationship" @change="dealLeftSagittalChange">
          <el-checkbox label="0" name="keep" border>维持</el-checkbox>
          <el-checkbox label="1" name="changeCanine" border>改善尖牙关系</el-checkbox>
          <el-checkbox label="2" name="changeMolar" border>改善磨牙关系</el-checkbox>
          <el-checkbox label="3" name="keep" border>3D设计之后再确定</el-checkbox>
        </el-checkbox-group>
        <div v-if="toothFlag.leftSagittalCanineFlag">
          <span class="tabSpan">改善尖牙关系方法&nbsp;&nbsp;</span>
          <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.SagittalRelationship.leftCanineRelationship">
            <el-checkbox label="0" name="interproximalEnamel" border>邻面去釉</el-checkbox>
            <el-checkbox label="1" name="traction2_3" border>II/III类牵引</el-checkbox>
            <el-checkbox label="2" name="distanceMolar" border>远移磨牙(需配合颌间牵引)</el-checkbox>
            <el-checkbox label="3" name="implantTraction" border>种植牵引</el-checkbox>
            <el-checkbox label="4" name="closeMolar" border>近移牵引</el-checkbox>
          </el-checkbox-group>
        </div>
        <div v-if="toothFlag.leftSagittalMolarFlag">
          <span class="tabSpan">改善磨牙关系方法&nbsp;&nbsp;</span>
          <el-checkbox-group class="inlineCheckBox"  v-model="submitCaseForm.SagittalRelationship.leftMolarRelationship" @change="dealMolarChange">
            <el-checkbox label="0" name="interproximalEnamel" border>邻面去釉</el-checkbox>
            <el-checkbox label="1" name="traction2_3" border>II/III类牵引</el-checkbox>
            <el-checkbox label="2" name="distanceMolar" border>远移磨牙(需配合颌间牵引)</el-checkbox>
            <el-checkbox label="3" name="implantTraction" border>种植牵引</el-checkbox>
            <el-checkbox label="4" name="closeMolar" border>近移牵引</el-checkbox>
          </el-checkbox-group>
        </div>
    </el-form-item>

    <el-form-item label="覆盖" prop="override">
        <el-radio-group v-model="submitCaseForm.override">
          <el-radio label="1" name="wait" border>3D设计之后再确定</el-radio>
          <el-radio label="2" name="keep" border>维持</el-radio>
          <el-radio label="3" name="change" border>改善</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="覆𬌗">
      <el-radio-group v-model="submitCaseForm.overrideTooth" @change="dealOverride">
        <el-radio label="1" name="wait" border>3D设计之后再确定</el-radio>
        <el-radio label="2" name="keep" border>维持</el-radio>
        <el-radio label="3" name="changeOpenTooth" border>纠正开𬌗</el-radio>
        <el-radio label="4" name="changeOverrideTooth" border>改善深覆𬌗</el-radio>
      </el-radio-group>
      <div v-if="toothFlag.openTooth">
        <span class="tabSpan">上颌&nbsp;&nbsp;</span>
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.overrideToothData.upEnlargeFrontTooth">
          <el-checkbox label="1" name="enlargeFrontTooth" border>伸长前牙</el-checkbox>
          <el-checkbox label="2" name="lowerBackTooth" border>压低后牙</el-checkbox>
          <el-checkbox label="0" name="other" border>其他(在特殊说明中写明)</el-checkbox>
        </el-checkbox-group>
        <br/>
        <span class="tabSpan">下颌&nbsp;&nbsp;</span>
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.overrideToothData.downEnlargeFrontTooth">
          <el-checkbox label="1" name="enlargeFrontTooth" border>伸长前牙</el-checkbox>
          <el-checkbox label="2" name="lowerBackTooth" border>压低后牙</el-checkbox>
          <el-checkbox label="0" name="other" border>其他(在特殊说明中写明)</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="toothFlag.override">
        <span class="tabSpan">上颌&nbsp;&nbsp;</span>
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.overrideToothData.upLowerBackTooth">
          <el-checkbox label="1" name="lowerBackTooth" border>压低前牙</el-checkbox>
          <el-checkbox label="2" name="enlargeFrontTooth" border>升高前磨牙</el-checkbox>
          <el-checkbox label="3" name="other" border>前牙平导板(适用于深𬌗浅覆盖病例)</el-checkbox>
          <el-checkbox label="0" name="other" border>其他(在特殊说明中写明)</el-checkbox>
        </el-checkbox-group>
        <div v-if="submitCaseForm.overrideToothData.upLowerBackTooth.indexOf('3') !== -1">
          <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.overrideToothData.frontToothLevel">
            <el-checkbox label="1" name="frontMid" border>前牙中切牙</el-checkbox>
            <el-checkbox label="2" name="frontSide" border>前牙侧切牙</el-checkbox>
            <el-checkbox label="3" name="frontGap" border>前牙间牙</el-checkbox>
          </el-checkbox-group>
        </div>
        <br v-if="submitCaseForm.overrideToothData.upLowerBackTooth.indexOf('3') === -1"/>
        <span class="tabSpan">下颌&nbsp;&nbsp;</span>
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.overrideToothData.downLowerBackTooth">
          <el-checkbox label="1" name="enlargeFrontTooth" border>压低前牙</el-checkbox>
          <el-checkbox label="2" name="lowerBackTooth" border>升高前磨牙</el-checkbox>
          <el-checkbox label="0" name="other" border>其他(在特殊说明中写明)</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>

    <el-form-item label="前牙反𬌗" prop="frontToothBack">
      <el-radio-group v-model="submitCaseForm.frontToothBack" @change="dealFrontToothBack">
        <el-radio label="0" name="keep" border>维持</el-radio>
        <el-radio label="1" name="improve" border>改善</el-radio>
        <el-radio label="2" name="change" border>纠正</el-radio>
      </el-radio-group>
      <div v-if="toothFlag.frontToothBackFlag">
        <span class="tabSpan"></span>
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.frontToothBackData">
          <el-checkbox label="1" border>唇移上前牙</el-checkbox>
          <el-checkbox label="2" border>舌移下前牙</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>

    <el-form-item label="前牙对刃𬌗" prop="frontToothCounterBlade">
      <el-radio-group v-model="submitCaseForm.frontToothCounterBlade" @change="dealFrontToothCounterBlade">
        <el-radio label="0" border>不纠正</el-radio>
        <el-radio label="1" border>纠正</el-radio>
      </el-radio-group>
      <div v-if="toothFlag.frontToothCounterBladeFlag">
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.frontToothCounterBladeData">
          <el-checkbox label="0" name="" border>伸长上颌前牙</el-checkbox>
          <el-checkbox label="1" name="" border>伸长下颌前牙</el-checkbox>
          <el-checkbox label="2" name="" border>压低上颌前牙</el-checkbox>
          <el-checkbox label="3" name="" border>压低下颌前牙</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>

    <el-form-item label="后牙反𬌗锁𬌗" prop="backOrLockTooth">
      <el-radio-group v-model="submitCaseForm.backOrLockTooth" @change="dealBackOrLockTooth">
        <el-radio label="0" border>不纠正</el-radio>
        <el-radio label="1" border>纠正</el-radio>
      </el-radio-group>
      <div v-if="toothFlag.backOrLockToothFlag">
        <el-checkbox-group class="inlineCheckBox" v-model="submitCaseForm.backOrLockToothData">
          <el-checkbox label="0" name="right" border>右侧</el-checkbox>
          <el-checkbox label="1" name="left" border>左侧</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>

    <el-form-item label="中线" prop="midLine">
      <el-radio-group v-model="submitCaseForm.midLine" @change="dealMidLine">
        <el-radio label="0" border>3D设计之后再确定</el-radio>
        <el-radio label="1" border>维持中线(可能需要邻面去釉)</el-radio>
        <el-radio label="2" border>改善(可能需要邻面去釉)</el-radio>
      </el-radio-group>
      <div v-if="toothFlag.midLineFlag">
        <span>上颌&nbsp;&nbsp;</span>
        <el-radio-group v-model="submitCaseForm.midLineData.upMidLineData" @change="dealUpMidLine">
          <el-radio label="1" name="right" border>患者向右</el-radio>
          <el-radio label="2" name="left" border>患者向左</el-radio>
          <el-radio label="0" name="keep" border>维持</el-radio>
        </el-radio-group>
        <div v-if="toothFlag.midLineUpFlag">
          <el-radio-group v-model="submitCaseForm.midLineData.upToothData">
            <el-radio label="1" name="justStandard" border>1-2mm</el-radio>
            <el-radio label="2" name="surpassStandard" border>2mm以上</el-radio>
          </el-radio-group>
        </div>
        <br v-if="!toothFlag.midLineUpFlag"/>

        <span>下颌&nbsp;&nbsp;</span>
        <el-radio-group v-model="submitCaseForm.midLineData.downMidLineData" @change="dealDownMidLine">
          <el-radio label="1" name="right" border>患者向右</el-radio>
          <el-radio label="2" name="left" border>患者向左</el-radio>
          <el-radio label="0" name="keep" border>维持</el-radio>
        </el-radio-group>
        <div v-if="toothFlag.midLineDownFlag">
          <el-radio-group v-model="submitCaseForm.midLineData.downToothData">
            <el-radio label="1" name="justStandard" border>1-2mm</el-radio>
            <el-radio label="2" name="surpassStandard" border>2mm以上</el-radio>
          </el-radio-group>
        </div>
      </div>
    </el-form-item>

    <el-form-item label="间隙的矫治" prop="gapTreat">
      <el-radio label="0" v-model="submitCaseForm.gapTreat" border>3D设计之后再确定</el-radio>
      <br/>
      <span>上颌&nbsp;&nbsp;</span>
      <el-radio-group v-model="submitCaseForm.gapTreatUp">
        <el-radio label="1" border>前牙内收</el-radio>
        <el-radio label="2" border>前牙内收.后牙近移</el-radio>
        <el-radio label="3" border>后牙近移</el-radio>
      </el-radio-group>
      <br/>
      <span>下颌&nbsp;&nbsp;</span>
      <el-radio-group v-model="submitCaseForm.gapTreatDown">
        <el-radio label="1" border>前牙内收</el-radio>
        <el-radio label="2" border>前牙内收.后牙近移</el-radio>
        <el-radio label="3" border>后牙近移</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="拥挤的矫治" prop="crowdTreat">
      <el-checkbox-group v-model="submitCaseForm.crowdTreat">
        <el-checkbox>3D设计之后再确定(可接受去釉)</el-checkbox>
        <el-checkbox>3D设计之后再确定(可接受拔牙)</el-checkbox>
      </el-checkbox-group>
      <p>上颌</p>
      <el-form-item label="扩弓">
        <el-radio-group v-model="submitCaseForm.upToothCrowd.maxillaryExpansion">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="唇展">
        <el-radio-group v-model="submitCaseForm.upToothCrowd.lipsOpen">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邻面去釉">
        <el-radio-group  v-model="submitCaseForm.upToothCrowd.interproximalEnamel">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
        <div v-if="submitCaseForm.upToothCrowd.interproximalEnamel && submitCaseForm.upToothCrowd.interproximalEnamel !== '3'">
          <el-form-item label="前牙">
            <el-radio-group  v-model="submitCaseForm.interproximalData.frontTooth">
              <el-radio v-for="(item,index) in choice"
                        :label="item"
                        :key="index" border></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="右侧后牙">
            <el-radio-group  v-model="submitCaseForm.interproximalData.rightBackTooth">
              <el-radio v-for="(item,index) in choice"
                        :label="item"
                        :key="index" border></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="左侧后牙">
            <el-radio-group  v-model="submitCaseForm.interproximalData.leftBackTooth">
              <el-radio v-for="(item,index) in choice"
                        :label="item"
                        :key="index" border></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="远移磨牙" >
        <el-radio-group v-model="submitCaseForm.upToothCrowd.distanceMolar">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
      </el-form-item>

      <p>下颌</p>
      <el-form-item label="扩弓">
        <el-radio-group v-model="submitCaseForm.downToothCrowd.maxillaryExpansion">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="唇展" >
        <el-radio-group v-model="submitCaseForm.downToothCrowd.lipsOpen">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邻面去釉" >
        <el-radio-group v-model="submitCaseForm.downToothCrowd.interproximalEnamel">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
        <div v-if="submitCaseForm.downToothCrowd.interproximalEnamel && submitCaseForm.downToothCrowd.interproximalEnamel !== '3'">
          <el-form-item label="前牙">
            <el-radio-group  v-model="submitCaseForm.downInterproximalData.frontTooth">
              <el-radio v-for="(item,index) in choice"
                        :label="item"
                        :key="index" border></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="右侧后牙">
            <el-radio-group  v-model="submitCaseForm.downInterproximalData.rightBackTooth">
              <el-radio v-for="(item,index) in choice"
                        :label="item"
                        :key="index" border></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="左侧后牙">
            <el-radio-group  v-model="submitCaseForm.downInterproximalData.leftBackTooth">
              <el-radio v-for="(item,index) in choice"
                        :label="item"
                        :key="index" border></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="远移磨牙" >
        <el-radio-group v-model="submitCaseForm.downToothCrowd.distanceMolar">
          <el-radio label="1" border>首选</el-radio>
          <el-radio label="2" border>可选</el-radio>
          <el-radio label="3" border>不可选</el-radio>
        </el-radio-group>
      </el-form-item>

      <p>拔牙</p>
      <el-radio-group v-model="submitCaseForm.toothExtraction" @change="dealToothExtraction">
        <el-radio label="1" border>不拔牙</el-radio>
        <el-radio label="2" border>拔牙牙位</el-radio>
        <el-radio label="3" border>拔除多生牙</el-radio>
      </el-radio-group>
      <ToothAbstract :flag="toothFlag.toothExtractionFlag" :array="submitCaseForm.toothExtractionInfo"></ToothAbstract>
    </el-form-item>

    <el-form-item label="是否远程治疗" prop="distanceTreat">
      <el-radio-group v-model="submitCaseForm.distanceTreat" @change="dealDistanceTreat">
        <el-radio label="1" border>是</el-radio>
        <el-radio label="2" border>否</el-radio>
      </el-radio-group>
      <br v-if="toothFlag.distanceTreatFlag"/>
      <el-radio-group v-model="submitCaseForm.distanceTreatData" v-if="toothFlag.distanceTreatFlag">
        <el-radio label="1" border>每3个月复诊一次</el-radio>
        <el-radio label="2" border>每6个月复诊一次</el-radio>
        <el-radio label="3" border>每9个月复诊一次</el-radio>
        <el-radio label="4" border>每无法确定复诊时间（在特殊说明中写明）</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="特殊说明" prop="specialItem">
      <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="submitCaseForm.specialItem"
          :autosize="{ minRows: 4 }">
      </el-input>
    </el-form-item>

  </el-form>
</template>

<script>
import ToothAbstract from "@/views/inc/create/case_form/ToothAbstract";
export default {
  name: "CaseForm",

  components: {
    ToothAbstract
  },

  data() {
    return {
      choice: ['首选','可选','不可选'],

      submitCaseForm: {
        // 安氏分类 Ⅰ -- 1 / Ⅱ -- 2 / Ⅲ -- 3 / 其他 -- 4
        angleClass: [],
        // 错𬌗类型
        // 牙前突 1/拥挤 2/牙列间隙 3/深覆𬌗 4
        // 前牙反𬌗 5/ 后牙反𬌗 6 /后牙锁𬌗 7 /开𬌗 8
        // 上𬌗前突 9/ 上𬌗发育不足 10 /下𬌗前突 11 /下𬌗后缩 12
        // 笑线不调 13 / 其他 14
        malocclusionClass: [],
        // 症状主诉
        //
        reportedSymptom: [],

        // 矫治目标
        treadTarget: [],

        // 拟矫治牙颌
        supposeTarget: [],

        // 牙齿信息
        toothInfo: '0',
        toothInfoArray: [[], []],

        // 不可移动牙位
        dontMove: '0',
        dontMoveToothArray:[[], []],

        // 不可设计附件牙位
        dontAccessory: '0',
        dontAccessoryArray: [[],[]],

        // 面型对象
        faceType: '',
        upFaceChangeType: '',
        downFaceChangeType: '',

        // 覆盖
        override:'',

        // 矢状关系对象
        SagittalRelationship: {
          rightSagittalRelationship:[],
          leftSagittalRelationship:[],
          rightCanineRelationship:[],
          rightMolarRelationship:[],
          leftMolarRelationship:[],
          leftCanineRelationship:[],

        },

        // 覆𬌗
        overrideTooth: '',
        overrideToothData: {
          upEnlargeFrontTooth: [],
          downEnlargeFrontTooth: [],
          upLowerBackTooth: [],
          downLowerBackTooth: [],
          frontToothLevel:[]
        },

        // 前牙反 牙合
        frontToothBack: '',
        frontToothBackData: [],

        // 前牙对刃 牙合
        frontToothCounterBlade:'',
        frontToothCounterBladeData:[],

        // 后牙反𬌗或锁𬌗
        backOrLockTooth: '',
        backOrLockToothData: [],

        // 中线
        midLine:'',
        midLineData: {
          upMidLineData: '',
          downMidLineData: '',
          upToothData: '',
          downToothData: ''
        },

        // 间隙矫治
        gapTreat:'',
        gapTreatDown: '',
        gapTreatUp: '',

        // 拥挤的矫治
        crowdTreat: '',
        upToothCrowd: {
          maxillaryExpansion:'',
          lipsOpen:'',
          interproximalEnamel:'',
          distanceMolar:''
        },
        interproximalData: {
          frontTooth: '',
          rightBackTooth:'',
          leftBackTooth:''
        },
        downInterproximalData: {
          frontTooth: '',
          rightBackTooth:'',
          leftBackTooth:''
        },
        downToothCrowd: {
          maxillaryExpansion:'',
          lipsOpen:'',
          interproximalEnamel:'',
          distanceMolar:''
        },
        toothExtraction:'',
        toothExtractionInfo:[[],[]],

        // 远程矫治
        distanceTreat:'',
        distanceTreatData:'',


        // 上传备注对象
        reportedText: {
          reportedSymptomTextarea: '',
          treadTargetTextarea: '',
          supposeTargetTextarea: '',
          distanceMolar:''
        },
        // 特殊说明对象
        specialItem : ''
      },

      flags: {
        reportedSymptomFlag: false,
        treadTargetFlag: false,
        supposeTargetFlag: false
      },

      // 控制牙齿选项
      toothFlag: {
        toothInfoFlag: false,

        dontMoveToothFlag:false,

        dontAccessoryFlag:false,

        faceTypeFlag: false,

        rightSagittalCanineFlag: false,
        rightSagittalMolarFlag: false,
        leftSagittalCanineFlag: false,
        leftSagittalMolarFlag: false,
        // 覆𬌗
        openTooth: false,
        override: false,

        // 深牙反 牙合
        frontToothBackFlag: false,
        frontToothCounterBladeFlag:false,

        // backOrLockToothFlag
        backOrLockToothFlag:false,

        midLineFlag: false,
        midLineUpFlag: false,
        midLineDownFlag: false,

        // 拔牙
        toothExtractionFlag: false,
        // 远程治疗
        distanceTreatFlag:false
      },

      rules: {
        angleClass: [
          {required: true, message: '请选择分类类型', trigger: 'blur'}
        ],
        malocclusionClass: [
          {required: true, message: '请选择分类类型', trigger: 'blur'}
        ],
        reportedSymptom: [
          {required: true, message: '请选择主诉症状', trigger: 'blur'}
        ],
        target: [
          {required: true, message: '请选择矫治目标', trigger: 'blur'}
        ]
      }
    }
  },

  computed: {},

  methods: {
    dealChange(val) {
      this.toothFlag.toothInfoFlag = (val === '1')
    },
    dealDontChange(val) {
      this.toothFlag.dontMoveToothFlag = (val === '1')
    },
    dealAccessoryChange(val) {
      this.toothFlag.dontAccessoryFlag = (val === '1')
    },
    dealFaceTypeChange(val) {
      this.toothFlag.faceTypeFlag = (val === '1')
    },
    dealRightSagittalChange(val) {
      // 传入的val是一个数组
      this.toothFlag.rightSagittalCanineFlag = (val.indexOf('1') !== -1)
      this.toothFlag.rightSagittalMolarFlag = (val.indexOf('2') !== -1)
    },
    dealLeftSagittalChange(val) {
      this.toothFlag.leftSagittalCanineFlag = (val.indexOf('1') !== -1)
      this.toothFlag.leftSagittalMolarFlag = (val.indexOf('2') !== -1)
    },
    dealOverride(val) {
      this.toothFlag.openTooth = (val === '3')
      this.toothFlag.override = (val === '4')
    },
    dealFrontToothBack(val){
      this.toothFlag.frontToothBackFlag = (val === '2' || val === '1')
    },
    dealFrontToothCounterBlade(val) {
      this.toothFlag.frontToothCounterBladeFlag = (val === '1')
    },
    dealBackOrLockTooth(val) {
      this.toothFlag.backOrLockToothFlag = (val === '1')
    },
    dealMidLine(val) {
      this.toothFlag.midLineFlag = ( val === '2')
    },
    dealUpMidLine(val) {
      this.toothFlag.midLineUpFlag = (val === '1' || val === '2')
    },
    dealDownMidLine(val) {
      this.toothFlag.midLineDownFlag = (val === '1' || val === '2')
    },
    dealToothExtraction(val) {
      this.toothFlag.toothExtractionFlag = (val === '2')
    },
    dealDistanceTreat(val) {
      this.toothFlag.distanceTreatFlag = (val === '1')
    }
  }
}
</script>

<style scoped>

  .inlineCheckBox {
    display: inline;
  }
  .tabSpan{
    margin-left: 100px;
  }
  .el-checkbox{
    margin-right: 1px;
  }
  .el-radio{
    margin-right: 1px;
  }
  p {
    font-size: 14px;
    line-height: 36px;
    color: rgb(94, 174, 227);
  }
  .el-textarea {
    width: 1000px;
  }
</style>
