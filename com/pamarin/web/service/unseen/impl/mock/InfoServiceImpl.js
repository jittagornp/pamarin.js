/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.web.service.unseen.impl.mock.InfoServiceImpl', [
    'module',
    'com.pamarin.core.remote.RemoteService',
    'com.pamarin.api.service.unseen.InfoService',
    'com.pamarin.api.model.unseen.Info',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.logging.LoggerFactory'
], function(module, RemoteService, InfoService, Info, ArrayList, LoggerFactory) {

    /**
     * @class InfoServiceImpl
     * @implements InfoService
     * @service
     */
    var InfoServiceImpl = RemoteService.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        function createInfo() {
            var info = new Info();
            info.setTitle('ประวัติความเป็นมา');
            info.setContent('ตามตำนานกล่าวไว้ว่ามีพรานป่าผู้หนึ่งได้พยายามล่ากระทิงซึ่งหลบหนีไปยังยอดเขาลูกหนึ่งในตำบลศรีฐาน (ปัจจุบันอยู่ในอำเภอภูกระดึง) ซึ่งเป็นภูเขาที่ไม่เคยมีใครขึ้นมาก่อน เมื่อนายพรานได้ตามกระทิงขึ้นไปบนยอดเขาแห่งนั้น ก็ได้พบว่าพื้นที่บนภูเขาลูกนั้น เต็มไปด้วยพื้นที่ราบกว้างใหญ่สวยงาม เต็มไปด้วยป่าสน พรรณไม้ และสัตว์ป่านานาชนิด มนุษย์จึงรู้จักภูกระดึงแต่นั้นเป็นต้นมา ภูกระดึงเป็นที่รู้จักกันมาตั้งแต่ในสมัยสมเด็จพระมงกุฏเกล้าเจ้าอยู่หัวรัชกาลที่ 6 มีปรากฏเป็นหลักฐานเมื่อสมุหเทศาภิบาล (พระเจ้าวรวงศ์เธอกรมหลวงประจักษ์ศิลปาคม) ได้ทำรายงานสภาพภูมิศาสตร์เสนอต่อกระทรวงมหาดไทย ในปี พ.ศ. 2486 ทางราชการได้ออกพระราชกฤษฎีกาป่าสงวนแห่งชาติ กรมป่าไม้จึงได้เริ่มดำเนินการสำรวจเพื่อจัดตั้งอุทยานแห่งชาติขึ้นที่ภูกระดึง จังหวัดเลย เป็นแห่งแรก แต่เนื่องจากขาดแคลนงบประมาณและเจ้าหน้าที่จึงใด้ดำเนินการไปเพียงเล็กน้อยและหยุดไป เมื่อวันที่ 7 ตุลาคม พ.ศ. 2502 คณะรัฐมนตรีได้มีมติให้กำหนดป่าในท้องที่จังหวัดต่างๆรวม 14 แห่งเป็นอุทยานแห่งชาติเพื่ออนุรักษ์ทรัพยากรธรรมชาติเอาไว้เป็นการถาวรเพื่อประโยชน์ส่วนรวม กรมป่าไม้จึงได้เสนอจัดตั้งป่าภูกระดึงให้เป็นอุทยานแห่งชาติตามความในมาตรา 6 แห่งพระราชบัญญัติอุทยานแห่งชาติ พ.ศ. 2504 โดยได้มีพระราชกฤษฎีกากำหนดป่าภูกระดึงในท้องที่ตำบลศรีฐาน กิ่งอำเภอภูกระดึง อำเภอวังสะพุง จังหวัดเลย เป็นอุทยานแห่งชาติ มีเนื้อที่ทั้งสิ้น 217,581 ไร่ นับเป็นอุทยานแห่งชาติแห่งที่ 2 ของประเทศ ในวันที่ 6 กรกฎาคม พ.ศ. 2520 คณะรัฐมนตรีได้มีมติให้ดำเนินการเพิกถอนเขตอุทยานแห่งชาติในบริเวณที่กองทัพอากาศขอใช้ประโยชน์ตั้งเป็นสถานีถ่ายทอดโทรคมนาคมเพื่อประโยชน์ในราชการทหารมีเนื้อที่ประมาณ 5 ไร่ ทางกรมป่าไม้จึงได้ดำเนินการขอเพิกถอนพื้นที่ดินดังกล่าวในปี พ.ศ. 2521 ปัจจุบันอุทยานแห่งชาติภูกระดึงมีเนื้อที่อยู่ประมาณ 217,576.25 ไร่');

            return info;
        }

        return {
            /**/
            findByUnseenId: function(chain, unseenId, pageable) {
                if (pageable.getPageNumber() < 3){
                    LOG.debug('load info page --> ({} : {})', pageable.getPageNumber(), pageable.getPageSize());
                    
                    var list = new ArrayList();
                    for (var index = 1; index <= pageable.getPageSize(); index++) {
                        var info = createInfo();
                        info.setId(index);
                        list.add(info);
                    }

                    chain.done(list);
                }
            }

        };
    })()).implements(InfoService);



    return InfoServiceImpl;
});
