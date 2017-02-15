import React from 'react';
import ReactDOM from 'react-dom';

import MajorFilter from 'components/major-filter';
import AcademicRankFilter from 'components/academic-rank-filter';
import UniversityFilter from 'components/university-filter';

import 'styles/pagination.css';

import Today from 'components/today';

import 'bower/select2/dist/css/select2.min.css';
import 'bower/select2/dist/js/select2.min.js';

const GridContainer = React.createClass(
		{
			_getStat( url ) {
				const $this = this;
				this.setState(
						{
							g_loading: true
						}
				);
				$.ajax(
						{
							url    : url,
							timeout: 10000,
							success: data => {
								$this.setState(
										{
											stat_data: data,
											g_loading: false
										}
								);
							}
						}
				);
			},

			_getUniversityFields( url, university_name, cb = () => (undefined) ) {
				const grid = this;
				this.setState(
						{
							u_loading: true
						}
				);
				$.ajax(
						{
							url    : url,
							timeout: 10000,
							cache  : true,
							data   : {
								UniversityName: university_name ? university_name : 'همه'
							},
							success: ( data, status ) => {
								grid.setState(
										{
											field_items: data,
											u_loading  : false
										}
								);
							},
							error  : ( xhr, status, error ) => {
								// console.log(error, status);
							}
						}
				);
			},

			_getMajorOptions() {
				const $this = this;
				this.setState(
						{
							m_loading: true
						}
				);
				$.ajax(
						{
							url    : '/home/GetFields',
							success: data => {
								$this.setState(
										{
											major_options: data,
											m_loading    : false
										}
								);
							}
						}
				);
			},

			_getAcademicRank() {
				const $this = this;
				this.setState(
						{
							a_loading: true
						}
				);
				$.ajax(
						{
							url    : '/home/GetAcademicRanks',
							timeout: 10000,
							success: data => {
								$this.setState(
										{
											academic_rank: data,
											a_loading    : false
										}
								);
							},
							error  : status => {
								console.log( status );
							}
						}
				);
			},

			_handlePersonNameChange( e ) {
				this.setState(
						{ person_name: e.target.value }
				);
			},

			_handleUniversitySelect( university ) {
				this.setState(
						{
							university_name: university
						}
				);
			},

			_handleFieldSelect( field ) {
				console.log( field );
			},

			render() {
				const stat_data = this.state.stat_data;
				let TotalMembers = "";
				let lastUpdate = "";
				if( stat_data ) {
					TotalMembers = stat_data.TotalMembers;
					lastUpdate = stat_data.PersianLastUpdate;
				}
				return (
						<div>
							<div className="p-loading" style={{ display: this.state.a_loading ? 'block' : 'none' }}>
								<i className="fa fa-refresh fa-spin"/>
							</div>
							<div className="p-loading" style={{ display: this.state.m_loading ? 'block' : 'none' }}>
								<i className="fa fa-refresh fa-spin"/>
							</div>
							<div className="p-loading" style={{ display: this.state.u_loading ? 'block' : 'none' }}>
								<i className="fa fa-refresh fa-spin"/>
							</div>
							<div className="p-loading" style={{ display: this.state.g_loading ? 'block' : 'none' }}>
								<i className="fa fa-refresh fa-spin"/>
							</div>
							<div className="top-header text-center">
								<div className="container">
									<div className="row">
										<div className="col-md-7 col-xs-12">
											<div className="row">
												<div className="col-md-3 col-xs-3">
                    							<span>
                    							  امروز:&nbsp;
                    							</span>
													<span className="dateTime">
                      							<Today url="/Home/GetPersianDateTime"/>
                    							</span>
												</div>
												<div className="col-md-5 col-xs-5">
                    							<span>
                    							  تعداد کل اعضای هیئت علمی:&nbsp;
                    							</span>
													<span className="facultyMember red-title">
                      							<span>{TotalMembers}</span>&nbsp;نفر
                    							</span>
												</div>
												<div className="col-md-4 col-xs-4">
                    							<span>
                    							  آخرین تاریخ بروزرسانی:
                    							</span>
													<span className="updateTime">
                    							  <span style={{direction: 'ltr', display: 'inline-block'}}>&nbsp;{lastUpdate}&nbsp;</span>
                    							</span>
												</div>
											</div>
										</div>
										<div className="col-md-5 col-xs-12">
											<div className="universityAccess">
												<i className="fa fa-database"/>&nbsp;
												<a className="top-header_link" href="#">جهت اخذ دسترسی برای دانشگاه / موسسه و یا سازمان خود به این اطلاعات اینجا
													کلیک کنید </a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="container">
								<div className="row">
									<div className="header">
										<div className="row">
											<div className="col-md-3 col-xs-4">
												<div className="logoMinistryScience">
													<img className="img-responsive img-margin logoMinistryScienceImg"
														  src="/content/styles/images/logoMinistryScience.png" alt="معاونت پژوهش و فناوری"/>
													<p className="text-center">معاونت پژوهش و فناوری</p>
												</div>
												<div className="logoImg">
													<div className="row">
														<div className="col-md-5 col-xs-12">
															<img className="img-responsive img-margin logoMpfa" src="/content/styles/images/logoMapfa.png"
																  alt="مپفا"/>
														</div>
														<div className="col-md-7 col-xs-12">
															<span className="logoTitle">مدیریت پژوهش و فناوری ایران</span>
															<br />
															<span className="logoText">سامانه یکپارچه مدیریت <br /> اطلاعات پژوهشی و فنآوری</span>
														</div>
													</div>
												</div>
												<div className="siteTitle">
													<h1>سامانه <span className="red-title">علم سنجی</span> اعضای هیئت علمی</h1>
													<p>Iranian Scientometrics information</p>
												</div>
											</div>
											<div className="col-md-5 col-xs-2">
												<img className="img-responsive img-margin iranMap" src="/content/styles/images/iranMap.png" alt="Iran"/>
											</div>
											<div className="col-md-1 col-xs-1">
												<img className="img-responsive img-margin" src="/content/styles/images/Leader.png" alt="حضرت آیت الله خامنه‌ای"/>
											</div>
											<div className="slogan col-md-3 col-xs-5">
												<p className="sloganTitle">مقام معظم رهبــــــری <br /> حضرت آیت الله خامنه‌ای :</p>
												<p className="sloganText">لازم است که ما بانک اطلاعات و مرکزی داشته باشیم , که همه بدانند که چه انجام شده است و چه
													چیزی برای تکمیل یک پژوهش لازم است تا بتواند قطعات گوناگون در کنار هم جمع شود ...</p>
												<br />
												<p className="sloganText">نکته ای را که مورد تاکید بنده است , آن است که پژوهش اولا مورد اهتمام قرار بگیرد , ثانیا
													سمت و سوی پرداختن به نیازهای کشور را پیدا کند .یعنی حقیقتا پژوهشهائی بکنیم که مورد نیاز ماست ....</p>
											</div>
										</div>
									</div>
									<div className="main-content text-center">
										<div className="row main-top">
											<div className="col-md-2 col-xs-12">
												<span className="main-content-title-top">روش‌های جستجو</span>
											</div>
											<div className="col-md-10 col-xs-12">
												<p className="main-content-text-top text-right">با توجه به حجم بالای اطلاعات ,جهت تسریع در دسترسی به اطلاعات مورد
													نظر خود لطفا با انتخاب یکی ار روش‌های زیر به اطلاعات دست یابید:</p>
											</div>
										</div>
										<div className="row main-content-over">
											<div className="border-left-red col-md-2 col-xs-4 mouseHover">
												<div className="main-content-title">
													جستجوی نام,<br />نام خانوادگی / کد ملی
												</div>
												<div className="main-content-text">
													<p>لطفا نام / نام خانوادگی و یا کد ملی خود را برای جستجو وارد نماید:</p>
													<input className="form-control" value={this.state.person_name} type="text" name="Name"
															 placeholder="مثال: علی احمدی" onChange={this._handlePersonNameChange}/>
												</div>
												<a className="red-title main-content-link"
													href={"/Home/UserProfileEvaluation?person_name=" + this.state.person_name}>آغاز جستجو <i
														className="fa fa-search"/></a>
											</div>
											<div className="border-left-red col-md-2 col-xs-4 mouseHover">
												<div className="main-content-title">
													انتخاب دانشگاه / <br /> موسسه آموزش عالی
												</div>
												<div className="main-content-text">
													<p>لطفا نام دانشگاه و یا موسسه آموزش عالی مورد نظر خود را انتخاب نمایید:</p>
													<UniversityFilter
															items={this.state.field_items}
															onUniversitySelect={this._handleUniversitySelect}
															onFieldSelect={this._handleFieldSelect}
													/>
												</div>
												<a className="red-title main-content-link"
													href={"/Home/UserProfileEvaluation?university_name=" + this.state.university_name}>نمایش
													اطلاعات <i
															className="fa fa-search"/></a>
											</div>
											<div className="border-left-red col-md-2 col-xs-4 mouseHover">
												<div className="main-content-title">
													انتخاب مرتبه علمی / <br /> رشته تحصیلی
												</div>
												<div className="main-content-text">
													<p>لطفا مرتبه علمی و یا رشته تحصیلی مورد نظر خود را انتخاب نمایید:</p>
													<MajorFilter options={this.state.major_options}/>
													<div className="clearfix"/>
													<br/>
													<AcademicRankFilter options={this.state.academic_rank}/>
												</div>
												<a className="red-title main-content-link" href="#">نمایش اطلاعات <i className="fa fa-search"/></a>
											</div>
											<div className="border-left-red col-md-2 col-xs-6">
												<div className="main-content-title">
													پژوهشگر برتر بر اساس <br /> هارش / استنادات
												</div>
												<div className="main-content-text">
													<p>لطفا شاخص مورد نظر خود را انتخاب نمایید:</p>
													<div className="row">
														<div className="border-left-gray col-md-6 col-xs-6 mouseHover">
															<p className="sub-text">یک درصد پژوهشگر برتر بر اساس شاخص استناد <br /> Citation</p>
															<a className="red-title main-content-link"
																href={"/Home/UserProfileEvaluation?sort_by=Citation"}>مشاهده</a>
														</div>
														<div className="col-md-6 col-xs-6 mouseHover">
															<p className="sub-text">یک درصد پژوهشگر برتر بر اساس شاخص هرش <br /> H-Index</p>
															<a className="red-title main-content-link"
																href={"/Home/UserProfileEvaluation?sort_by=HIndex"}>مشاهده</a>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-2 col-xs-6">
												<div className="main-content-title">
													<span className="red-title">امکانات . قابلیت ها</span>
												</div>
												<div className="main-content-text">
													<ul className="list-facilities">
														<li className="mouseHover"><a href="/Home/Introduction">معرفی سامانه علم سنجی</a></li>
														<li className="mouseHover"><a data-toggle="modal" data-target="#FeedBackModal"
																								style={{ cursor: 'pointer' }}>ارسال بازخورد</a></li>
														<li className="mouseHover"><a href="/Home/ContactSupport">تماس با بخش پشتیبانی</a></li>
														<li className="mouseHover"><a href="/Home/HelpTutorials">راهنما و آموزش</a></li>
														<li className="mouseHover"><a href="/Home/FAQ">سئوالات متداول</a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
				);
			},

			getInitialState() {
				return {
					a_loading      : false,
					g_loading      : false,
					m_loading      : false,
					u_loading      : false,
					field_items    : "",
					stat_data      : "",
					academic_rank  : "",
					detail_data    : "",
					person_name    : "",
					university_name: "",
					person_major   : "",
					person_degree  : ""
				};
			},

			componentDidMount() {
				this._getUniversityFields( '/home/GetUniversities', 'همه' );
				this._getMajorOptions();
				this._getAcademicRank();
				this._getStat(
						'/Home/GetMainHeaderStatistics'
				);
				$( 'select' ).select2( { dir: 'rtl' } );
			}
		}
);

export default GridContainer;

$( '[data-component=grid-container]' ).each(
		( i, comp ) => {
			ReactDOM.render(
					<GridContainer />,
					comp
			);
		}
);
